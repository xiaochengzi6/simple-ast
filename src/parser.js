import { checkRight, PunctuationType } from "../utils/index.js"
import { ManageNode, TokensNode } from "./ManageNode.js"

const _Comma = '42'
const _ParentLeft = '40'
const _ParentRight = '41'
const _BlockLeft = '123'
const _BlockRight = '125'

const comma = PunctuationType[_Comma].type
const ParentLeft = PunctuationType[_ParentLeft].type
const ParentRight = PunctuationType[_ParentRight].type
const BlockLeft = PunctuationType[_BlockLeft].type
const BlockRight = PunctuationType[_BlockRight].type 



/**
 * 生成 ast
 * @param  tokens 
 */
function parser(tokens) {

  const tokens = new TokensNode(tokensValue)
  const rootNode = new ManageNode()
  rootNode.type = "Program"
  rootNode.body = []

  function walk() {
    const token = tokens.getToken()
    const node = new ManageNode()
    // todo 
    // 这里可以做个判断 没有取到 token 会直接退出

    const { type } = token

    // 在这里去进行关键词判断
    switch (type) {
      case 'var':
        tokens.next()
        // todo 
        // 这里可以对最终的 var 表达式看看是否存在 ; 如果没有
        return parserVar(node)

      case 'function ':
        tokens.next()
        return parserFunction(node)

      default:
        node.id = 'Default'
        node.type = type
    }

    return node
  }

  // 这里判断的逻辑要重新设置
  // todo
  while (tokens.exit()) {
    rootNode.body.push(walk())
  }

  /**
   * 对 var 关键词处理 
   * @param {*} node 
   */
  function parserVar(node) {
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
      if (!tokens.nextTest(comma)) break
    }

    return node.finish("VariableDeclaration")
  }

  /**
   * 对标识符处理
   * @param {*} parentNode  
   */
  function parserIdentifier(parentNode) {
    const node = new ManageNode(parentNode)
    node.name = tokens.getTokenValue()

    tokens.next()
    return tokens.finish("Identifier")
  }

  function parserFunction(node) {
    node.id = parserIdentifier(node)
    node.params = []

    const first = true

    tokens.expect(ParentLeft)
    while (!tokens.nextTest(ParentRight)) {
      !first
        ? tokens.expect(comma)
        : first = false

      node.params.push(parserIdentifier(node))
    }
    node.body = parserBlock(node)


    // todo
    // 这里还需要对函数声明和函数表达式做一个处理
    return node.finish("FunctionDeclaration")
  }

  // 这类函数应该不需要 括号在 js 中没有任何意义
  function parserParent(parent) {
    const node = new ManageNode(parent)

  }

  function parserBlock(parent) {
    const node = new ManageNode(parent)
    node.body = []
    tokens.expect(BlockLeft)
    
    while(!tokens.test(BlockRight)){
      // todo 难点：***
      // 这里对一些严格模式进行一些处理

      // 这里调用语法规则
      // const statement = 

      // node.body.push(statement)
    }
    
    return node.finish("BlockStatement")
  }

  return node
}


export default parser


function Warning(pos, message) {
  // todo
  // 这里去根据 input 和 pos 找到 行和列

  throw new SyntaxError(message)
}