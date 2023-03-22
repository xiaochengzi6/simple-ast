
// manageTokens 
/**
 * 管理 tokens 
 */
export class ManageNode {
  constructor(parentNode) {
    this.state = 0
    this.end = 0
    this.parentNode = parentNode || undefined
  }

  /**
   * 完成
   * @param {*} node 
   * @param {*} type 
   */
  finish(type) {
    this.type = type

    // 这里不知道该如何处理
    this.end = this.parentNode.end

    return this
  }

  /**
   * 合并
   * @param {*} node 
   * @param {*} position ParentNode 位置
   */
  merge(position, node) {
    const target = this.parentNode[position]
    if (target && typeof target === 'array') {
      if (!node) {
        return target.push(this)
      }
      return target.push(node)
    }
  }


}

/**
 * 处理 tokens 内容
 */
export class TokensNode {
  constructor(tokens) {
    this.tokens = tokens
    this.length = tokens.length
    this.current = 0
  }

  getToken(current = this.current) {
    if (this.exit(current)) return false

    return this.tokens[current]
  }

  getTokenType(current = this.current) {
    if (this.exit(current)) return false
    const { type } = this.tokens[current]

    return type
  }

  getTokenValue(current = this.current) {
    if (this.exit(current)) return false
    const { value, keyword } = this.tokens[current]

    // 如果 token 中没有 value 就返回 keyword
    return value || keyword
  }

  getLength(tokens = this.tokens) {
    if (typeof tokens !== 'array') return 0
    return tokens.length
  }

  next() {
    const current = ++this.current
    if (this.exit(current)) return false

    return this.tokens[++this.current]
  }

  nextTest(type) {
    const nextToken = this.peek()
    if (type === nextToken.type) {
      this.next()
      return true
    }

    return false
  }

  expect(type){
    if(this.getTokenType === type) {
      this.next()
    }

    // todo 
    // 这里如果不对就要抛错
    return 
  }

  peek(current = this.current + 1) {
    if (this.exit(current)) return false

    return this.tokens[current]
  }

  exit(current) {
    if (current > this.getLength()) return true

    return false
  }
}