import ManageNode from "../ManageNode.js"
import TokensNode from './ToKensNode.js'
import {
  ParentLeft,
  Comma,
  ParentRight,
  BlockLeft,
  BlockRight,
  EqualSignSymbol,
  ColonSymbol,
  _Else,
  _Catch,
  _Finally,
  SemiSymbol,
  _Var,
  _In,
  _Case,
  _Default,
  _While
} from './../../utils/index.js'
import rangeMap from "./rangeMap.js"

class ParserKeywords extends TokensNode {
  constructor(tokens) {
    super(tokens)
  }

  walk(isKey) {
    const token = this.getToken()
    // todo
    // 这里要对它的长度单独处理
    const node = new ManageNode()
    // todo 
    // 这里可以做个判断 没有取到 token 会直接退出
    if (this.exit()) { return }

    const { type, value } = token

    // 在这里去进行关键词判断
    switch (value) {
      case 'debugger':
        this.next()
        this.parserSemi()

        return node.finish("DebuggerStatement")

      case 'break':
      case 'continue':
        const isBreak = this.getTokenValue() === 'break'
        this.next()

        if (this.test(SemiSymbol)) {
          node.label = null
        }

        return node.finish(isBreak ? "BreakStatement" : "ContinueStatement")

      case 'if':
        this.next()
        // 处理 括号
        node.test = this.parserParent()
        node.consequent = this.walk()
        node.alternate = this.test(_Else) ? this.walk() : null

        return node.finish("IfStatement")

      case 'with':
        this.next()
        node.object = this.parserParent(node)
        node.body = this.walk()

        return node.finish("WithStatement")

      case 'while':
        this.next()
        node.test = this.parserParent(node)
        node.body = this.walk()

        return node.finish("WhileStatement")

      case 'try':
        this.next()
        node.block = this.parserBlock()
        node.handlers = []

        while (this.getTokenType() === _Catch) {
          const childNode = new ManageNode()
          this.next()
          // 这里调用 expect 会向下走一行
          // this.expect(ParentLeft)
          childNode.param = this.parserParent()
          //  todo 
          // 在这里校验 param 正确性

          childNode.guard = null
          childNode.body = this.parserBlock()

          node.handlers.push(childNode.finish("CatchClause"))
        }
        node.finalizer = this.test(_Finally) ? this.parserBlock() : null

        if (!node.handlers.length && !node.finalizer) {
          // 抛错
          throw SyntaxError("必须要有 catch or finally")
        }

        return node.finish("TryStatement")

      case 'throw':
        this.next()
        // todo
        // 这里可以测试有没有换行  存在换行就抛错
        node.argument = this.parseExpression()
        this.parserSemi()
        return node.finish("ThrowStatement")

      case 'return':
        // todo  
        // 这里要实现当前 token 是否在函数体内 不然就会抛错

        this.next()
        if (this.test(SemiSymbol)) {
          node.argument = null
        } else {
          node.argument = this.parseExpression()
          this.parserSemi()
        }

        return node.finish("ReturnStatement")

      case 'for':
        this.next()
        this.expect(ParentLeft)
        if (this.getTokenType() === SemiSymbol) return parserFor(node)
        // todo 
        // 这里是判断  for(var i = 2) 这类东西
        // 但 es6 可以使用 let 或者 const 这类东西
        // 目前先做 es5 
        if (this.getTokenType() === _Var) {
          const childNode = new ManageNode()
          this.next()
          this.parserVar(childNode)
          // this.parserSemi()
          if (childNode.declarations.length === 1 && this.test(_In)) {
            return this.parserForIn(node, childNode)
          }
          return this.parserFor(node, childNode)
        }
        const childNode = this.parseExpression()
        if (this.test(_In)) {
          // todo
          // 这里对 In 后的 indentifier 做判断是否合法
          return this.parserForIn(node, childNode)
        }

        return this.parserFor(node, childNode)

      case 'switch':
        this.next()
        node.discriminant = this.parserParent()
        node.cases = []
        this.expect(BlockLeft)

        let caseNode
        while (!this.test(BlockRight)) {
          if (this.getTokenType() === (_Case || _Default)) {
            let isCase = this.getTokenType() === _Case
            if (caseNode) {
              caseNode.finish("SwitchCase")
            }
            // 添加 case 
            node.cases.push(caseNode = new ManageNode())
            // case 执行内容
            caseNode.consequent = []
            this.next()

            if (isCase) {
              // case 判断条件
              caseNode.test = this.parseExpression()
            } else {
              // todo
              // 判断是否出现多个 default 
              caseNode.test = null
            }

            // 判断 case 或者 default 种不能出现 * 符号
            this.expect(ColonSymbol)
          } else {
            caseNode.consequent.push(this.walk())
          }
        }

        if (caseNode) {
          caseNode.finish("SwitchCase")
        }
        this.next()

        return node.finish("SwitchStatement")

      case 'do':
        this.next()
        node.body = this.walk()
        this.expect(_While)
        node.test = this.parserParent()
        this.parserSemi()

        return node.finish("DoWhileStatement")

      case ';':
        // ; 字符 有意义 用在 for 阶段 不可忽视
        next()
        return node.finish(EmptyStatement)

      case 'var':
        this.next()
        // todo 
        // 这里可以对最终的 var 表达式看看是否存在 ; 如果没有
        const _varNode = this.parserVar(node)
        this.parserSemi()

        return _varNode

      case 'function':
        this.next()
        return this.parserFunction(node)

      case "{":
        return this.parserBlock(node)

      default:
        if (this.getTokenType === "UnknownStatement") {
          node.ERROR = "出现未知类型"
          node.value = this.getTokenValue()
          node.current = this.current
          return node.finish("Error")
        }

        // -----------------------------------------------------
        const result = this.parseExpression(node)
        // 关于 labelStatement 更多内容
        // https://segmentfault.com/a/1190000014127816
        if (result && result.type === 'Identifier' && this.test(ColonSymbol)) {
          node.body = this.walk()
          node.label = result
          return node.finish("LabeledStatement")
        }

        else {
          node.expression = result
          this.parserSemi()
          return node.finish("ExpressionStatement")
        }
    }
  }

  parserVar(node) {
    node.declarations = []
    node.kind = "var"

    while (true) {
      const childNode = new ManageNode()
      childNode.id = this.parserIdentifier()
      // 这里对严格模式中的 var 也做了处理 
      // 比如：var 严格模式不能对 argument 和 eval 进行处理

      // 这里去进行语法分析
      // todo 

      childNode.init =
        this.test(EqualSignSymbol) ?
          this.parseExpression() :
          null

      node.declarations.push(childNode.finish("VariableDeclaration"))

      // 逗号
      if (!this.test(Comma)) break
    }

    return node.finish("VariableDeclaration")
  }

  parserIdentifier() {
    const node = new ManageNode()
    node.name = this.getTokenValue()

    this.next()
    return node.finish("Identifier")
  }

  parserFunction(node) {
    // 先暂时这样处理 还有一种情况是 var a = function (){} 没有 id 
    // 这里先暂时不处理
    node.id = this.parserIdentifier()
    node.params = []

    let first = true

    this.expect(ParentLeft)

    while (!this.test(ParentRight)) {
      if (!first) {
        this.expect(Comma)
      } else {
        first = false
      }

      node.params.push(this.parserIdentifier())
    }
    node.body = this.parserBlock()


    // todo
    // 这里还需要对函数声明和函数表达式做一个处理
    return node.finish("FunctionDeclaration")
  }

  parserBlock() {
    const node = new ManageNode()
    node.body = []
    this.expect(BlockLeft)

    while (!this.test(BlockRight)) {
      // todo 难点：***
      // 这里对一些严格模式进行一些处理

      // 从头开始
      const statement = this.walk()

      node.body.push(statement)
    }

    return node.finish("BlockStatement")
  }

  parserParent() {
    this.expect(ParentLeft)
    const node = this.parseExpression()
    rangeMap.log()
    this.expect(ParentRight)
    rangeMap.log()
    return node
  }

  parserSemi() {
    this.test(SemiSymbol)
  }

  parserFor(node, childNode) {
    node.init = childNode

    this.expect(SemiSymbol)
    node.test = this.getTokenType() === SemiSymbol ? null : this.parseExpression()

    this.expect(SemiSymbol)
    node.update = this.getTokenType() === ParentRight ? null : this.parseExpression()

    this.expect(ParentRight)
    node.body = this.walk()

    return node.finish("ForStatement")
  }

  parserForIn(node, childNode) {
    node.left = childNode
    node.right = this.parseExpression()
    this.expect(ParentRight)
    node.body = this.walk()

    return node.finish("ForInStatement")
  }
}

export default ParserKeywords