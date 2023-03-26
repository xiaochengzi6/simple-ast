import ManageNode from "../ManageNode.js";
import TokensNode from './ToKensNode.js';
import {
  ParentLeft,
  Comma,
  ParentRight,
  BlockLeft,
  BlockRight,
  EqualSignSymbol,
  ColonSymbol
} from './../../utils/index.js';



class ParserKeywords extends TokensNode {
  constructor(tokens) {
    super(tokens)
  }

  walk() {
    const token = this.getToken()
    const node = new ManageNode()
    // todo 
    // 这里可以做个判断 没有取到 token 会直接退出
    if (this.exit()) { return }

    const { type, value } = token

    // 在这里去进行关键词判断
    switch (value) {
      case 'var':
        this.next()
        // todo 
        // 这里可以对最终的 var 表达式看看是否存在 ; 如果没有
        return this.parserVar(node)

      case 'function':
        this.next()
        return this.parserFunction(node)

      default:
        if(this.getTokenType === "UnknownStatement"){
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
          return node.finish("ExpressionStatement")
        }
    }
  }

  parserVar(node) {
    node.declarations = []
    node.kind = "var"

    while (true) {
      const childNode = new ManageNode(node, this.getToken())
      childNode.id = this.parserIdentifier(childNode)
      // 这里对严格模式中的 var 也做了处理 
      // 比如：var 严格模式不能对 argument 和 eval 进行处理

      // 这里去进行语法分析
      // todo 

      childNode.init =
        this.test(EqualSignSymbol) ?
          this.parseExpression(node) :
          null

      node.declarations.push(childNode.finish("VariableDeclaration"))

      // 逗号
      if (!this.test(Comma)) break
    }

    return node.finish("VariableDeclaration")
  }

  parserIdentifier(parentNode) {
    const node = new ManageNode(parentNode, this.getToken())
    node.name = this.getTokenValue()

    this.next()
    return node.finish("Identifier")
  }

  parserFunction(node) {
    // 先暂时这样处理 还有一种情况是 var a = function (){} 没有 id 
    // 这里先暂时不处理
    node.id = this.parserIdentifier(node)
    node.params = []

    const first = true
    console.log(this.getTokenType(), ParentLeft)
    this.expect(ParentLeft)

    while (!this.test(ParentRight)) {
      !first
        ? this.expect(Comma)
        : first = false

      node.params.push(this.parserIdentifier(node))
    }
    node.body = this.parserBlock(node)


    // todo
    // 这里还需要对函数声明和函数表达式做一个处理
    return node.finish("FunctionDeclaration")
  }

  parserBlock(parent) {
    const node = new ManageNode(parent, this.getToken())
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


}

export default ParserKeywords