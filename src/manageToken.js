/**
 * 管理 tokens 
 */
class ManageToken {
  constructor(tokens) {
    if (!tokens) {
      this.tokens = []
    } else {
      this.tokens = tokens
    }

    this.current = 0
  }

  next() {
    this.current++
    return this.getToken()
  }

  // 预读 token
  peek(current = this.current + 1) {
    return this.tokens[current]
  }

  getToken(current = this.current) {
    return this.tokens[current]
  }

  getTokenType() {

  }

  isSameTokenType(type) {
    const { type: currentObjType } = this.tokens[this.current]
    return currentObjType === type   
  }

}