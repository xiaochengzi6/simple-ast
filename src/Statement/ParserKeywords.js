import { PunctuationType } from "../jutils/index.js"
import ManageNode from "../ManageNode.js";
import TokensNode from './ToKensNode';

const _Comma = '42'
const _ParentLeft = '40'
const _ParentRight = '41'
const _BlockLeft = '123'
const _BlockRight = '125'

export const comma = PunctuationType[_Comma].type
export const ParentLeft = PunctuationType[_ParentLeft].type
export const ParentRight = PunctuationType[_ParentRight].type
export const BlockLeft = PunctuationType[_BlockLeft].type
export const BlockRight = PunctuationType[_BlockRight].type 

class ParserKeywords extends TokensNode {
  constructor(tokens) {
   super(tokens)
  }

  parserVar(node) {
    node.declarations = []
    node.kind = "var"

    while (true) {
      const childNode = new ManageNode(node)
      childNode.id = parserIdentifier(childNode)
      // 这里对严格模式中的 var 也做了处理 
      // 比如：var 严格模式不能对 argument 和 eval 进行处理

      // 这里去进行语法分析
      // todo 

      node.declarations.push(childNode.finish("VariableDeclaration"))

      // 逗号
      if (!this.tokens.nextTest(comma)) break
    }

    return node.finish("VariableDeclaration")
  }

  parserIdentifier(parentNode) {
    const node = new ManageNode(parentNode)
    node.name = this.tokens.getTokenValue()

    this.tokens.next()
    return this.tokens.finish("Identifier")
  }

  parserFunction(node) {
    node.id = this.parserIdentifier(node)
    node.params = []

    const first = true

    this.tokens.expect(ParentLeft)
    while (!tokens.nextTest(ParentRight)) {
      !first
        ? this.tokens.expect(comma)
        : first = false

      node.params.push(this.parserIdentifier(node))
    }
    node.body = this.parserBlock(node)


    // todo
    // 这里还需要对函数声明和函数表达式做一个处理
    return node.finish("FunctionDeclaration")
  }

  parserBlock(parent) {
    const node = new ManageNode(parent)
    node.body = []
    this.tokens.expect(BlockLeft)

    while (!tokens.test(BlockRight)) {
      // todo 难点：***
      // 这里对一些严格模式进行一些处理

      // 这里调用语法规则
      const statement = this.parserExpression()

      node.body.push(statement)
    }

    return node.finish("BlockStatement")
  }
}

export default ParserKeywords