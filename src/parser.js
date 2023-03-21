import { checkRight, KeywordType } from "../utils/index.js"

/**
 * 生成 ast
 * @param  tokens 
 */
function parser(tokens) {
  let current = 0

  function walk() {
    let token = tokens[current]
    checkRight(token, `解析 token 出现问题 current: ${current}`)

    // 在这里去进行关键词判断
    switch (type) {
      case 'switch':
      case 'break':
        break
      case 'case':
        break
      case 'catch':
        break
      case 'class':
        break
      case 'continue':
        break
      case 'debugger':
        break
      case 'default':
        break
      case 'delete':
        break
      case 'do':
        break
      case 'else':
        break
      case 'false':
        break
      case 'in':
        break
      case 'if':
        break
      case 'true':
        break
      case 'break':
        break
      case 'var':
        break
      case 'let':
        break
      case 'const':
        break
      case 'function ':
        break
      case 'with':
        break
      case 'for':
        break
      case 'try':
        break
      case 'catch':
        break
      case 'null':
        break
      case 'new':
        break
      case 'instanceof':
        break
      case 'typeof':
        break
      default:
        break
    }
  }

  const ast = {
    type: 'Program',
    body: []
  }

  while (current < tokens.length) {
    ast.body.push(walk())
  }

  return ast
}




export default parser

// 初始化 token 节点
function InitTokenNode(){
  this.start = 0
  this.end = 0
  this.type = null
}


// 处理 tokens 
class TokensNode {
  constructor(tokens) {
    this.tokens = tokens
    this.length = tokens.length
    this.current = 0
  }

  getToken(current = this.current) {
    return this.tokens[current]
  }

  getLength(tokens = this.tokens) {
    if (typeof tokens !== 'array') return 0
    return tokens.length
  }

  next() {
    return this.tokens[++this.current]
  }

  peek(current = this.current + 1) {
    return this.tokens[current]
  }
}

const tokensValue = [
  { type: 'VariableDeclaration', kind: 'var', value: 'var' },
  { type: 'CustomNameStatement', value: 'name' },
  { type: 'EqualSignSymbol', value: '=' },
  { type: 'NumberStatement', value: '89' }
]

const tokens = new TokensNode(tokensValue)

function paserVar(node) {

}