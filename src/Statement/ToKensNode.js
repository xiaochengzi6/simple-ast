import rangeMap from "./rangeMap.js"

/**
 * 处理 tokens 内容
 */
class TokensNode {
  constructor(tokens) {
    this.tokens = tokens
    this.length = tokens.length
    this.current = 0
    // 初始化处理
    this.init()
    this.first = true
  }

  init() {
    const { blank } = this.tokens[0]
    if (blank) {
      this.next()
    }
  }

  getToken(current = this.current) {
    if (this.exit(current)) return false

    return this.tokens[current]
  }

  getTokenType() {
    if (this.exit(this.current)) return false
    const { type } = this.tokens[this.current]

    return type
  }

  getTokenValue() {
    if (this.exit(this.current)) return false
    const { value, keyword } = this.tokens[this.current]

    return value || keyword
  }

  getLength(tokens = this.tokens) {

    return tokens.length
  }

  next() {
    rangeMap.add(this.getTokenValue().length)

    const current = ++this.current

    // 限制长度
    if (current >= this.length) {
      return false
    }

    // 跳过 
    const isSkip = this.skip(this.current)
    if (isSkip) return

    return true
  }

  old_next() {
    // 处理 - 初次
    if (this.first) {
      // 跳过忽视的 token 
      if (!this.skip(this.current)) {
        rangeMap.add(this.getTokenValue().length)
      }
    }

    const current = ++this.current

    // 如果下一个 current > 当前的长度 就
    if (current >= this.length) {
      // 处理一下当前的 tokens 
      rangeMap.add(this.getTokenValue().length)

      return false
    }

    if (this.skip(current)) {
      return
    }


    if (!this.first) rangeMap.add(this.getTokenValue().length)

    this.first = false

    return true
  }

  test(type) {
    if (this.getTokenType() === type) {
      this.next()
      return true
    } else {
      return false
    }
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
  expect(type) {
    if (this.getTokenType() === type) {
      return this.next()
    }

    // todo 
    // 这里如果不对就要抛错 重写为函数
    throw SyntaxError(`请仔细校验代码语法是否正确${type}`)
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
  exit(current = this.current) {
    if (current >= this.getLength()) return true

    return false
  }

  skip(index) {
    const { blank } = this.tokens[index]

    // \n \t 这类的跳过
    if (blank) {
      this.next()
      return true
    }
    return false
  }


}

export default TokensNode