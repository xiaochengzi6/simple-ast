import { checkRight, KeywordType } from "../utils/index.js"
import { ManageNode, TokensNode } from "./ManageNode.js"

// 逗号
const _Comma = '42'



/**
 * 生成 ast
 * @param  tokens 
 */
function parser(tokens) {

  const tokens = new TokensNode(tokensValue)
  const node = new ManageNode()
  node.type = "Program"
  node.body = []

  function walk() {
    const token = tokens.getToken()
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
        return parseFunction(node);
        
    }
  }

  // 这里判断的逻辑要重新设置
  // todo
  while (tokens.exit()) {
    node.body.push(walk())
  }

  function parserVar(node) {
    node.declarations = []
    node.kind = "var"

    const commaType = KeywordType[_Comma].type
    while (true) {
      const childNode = new ManageNode(node)
      childNode.id = parserIdentifier(childNode)
      // 这里对严格模式中的 var 也做了处理 
      // 比如：var 严格模式不能对 argument 和 eval 进行处理

      // 这里去进行语法分析
      // todo 

      node.declarations.push(childNode.finish("VariableDeclaration"))

      // 逗号
      if (!tokens.nextTest(commaType)) break
    }
    
    return node.finish("VariableDeclaration")
  }

  function parserIdentifier(parentNode) {
    const node = new ManageNode(parentNode)
    node.name = tokens.getTokenValue()

    // 到这就终结了程序
    tokens.next()
    return tokens.finish("Identifier")
  }

  return node
}




export default parser



const tokensValue = [
  { type: 'VariableDeclaration', kind: 'var', value: 'var' },
  { type: 'CustomNameStatement', value: 'name' },
  { type: 'EqualSignSymbol', value: '=' },
  { type: 'NumberStatement', value: '89' }
]

function Warning(pos, message){
  // todo
  // 这里去根据 input 和 pos 找到 行和列

  throw new SyntaxError(message)
}