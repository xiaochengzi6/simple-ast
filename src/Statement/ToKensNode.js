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
    rangeMap.add(this.getTokenValue())
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
    rangeMap.lastStart = rangeMap.start
    rangeMap.lastEnd = rangeMap.end

    return this._next()
  }

  _next() {

    const current = ++this.current

    rangeMap.add(this.getTokenValue())
    // 限制长度
    if (current >= this.length) {
      return false
    }

    // 跳过 
    const { blank } = this.getToken()

    if (blank) {
      return this.next()
    }

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
    throw SyntaxError(`
    请仔细校验代码语法是否正确
    提示：语法正确但解析失败说明程序出现问题 
          有可能是 bug 也有可能目前不支持该语法 
          可以输入 es3 语法来简单测试该项目
    如果你有想法
    欢迎你提交 issue 或者 pr 此项目
    请多多包含 (^ _ ^!)
    `)
  }

  /**
   * 预读取下一个 token 
   * @param {*} current 索引 默认为 this.current 
   * @returns 
   */
  peek(toType, index) {
    const current = index || this.current
    if (this.exit(current)) return false

    const { blank, type } = this.tokens[current]

    // 跳过空白或者不需要的字符
    if (blank) {
      return this.peek(++current)
    }

    if (toType === type) {
      this.next()

      return true
    }

    return false
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

  /**
   * 跳过空白 或 无关 token 
   * @returns 
   */
  skip() {
    const { blank } = this.getTokenType()

    if (blank) {

      this.next()
      return true
    }
    return false
  }


}

export default TokensNode