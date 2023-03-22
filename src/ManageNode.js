
// manageTokens 
/**
 * 管理 tokens 
 */
export class ManageNode {
  constructor(parentNode) {
    const {state, end} = parentNode
    this.state = end + 1 || 0
    this.end = null 
    this.parentNode = parentNode || undefined
  }

  /**
   * 完成
   * @param {*} node 
   * @param {*} type 
   */
  finish(type) {
    this.type = type
  
    // todo 难度: *****
    // 在调用 finish 时候说明数据处理完全，可以处理 end 
    // this.end = 

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

  /**
   * 判断下次的 token 的 type 与参数相同 是 next() 否 false 
   * @param {*} type 
   * @returns 
   */
  nextTest(type) {
    const nextToken = this.peek()
    if (type === nextToken.type) {
      this.next()
      return true
    }

    return false
  }

  /**
   * 判断 type 和当前 type 是否一致 相同就 next() 否则 throw
   * @param {*} type 
   */
  expect(type){
    if(this.getTokenType === type) {
      this.next()
    }

    // todo 
    // 这里如果不对就要抛错 重写为函数
    throw SyntaxError(type)
  }

  /**
   * 预读取下一个 token 
   * @param {*} current 索引 默认为 this.current 
   * @returns 
   */
  peek(current = this.current + 1) {
    if (this.exit(current)) return false

    return this.tokens[current]
  }

  /**
   * 当 this.current > tokens 的长度 返回 true 否则 true
   * @param {*} current 
   * @returns 
   */
  exit(current) {
    if (current > this.getLength()) return true

    return false
  }
}
