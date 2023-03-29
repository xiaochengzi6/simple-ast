
import { getChatCode, IsSymbol } from './../../utils/index.js'
class RangeMap {
  constructor() {
    this.position = 0
    this.start = 0
    this.end = 0

    this.lastStart = 0
    this.lastEnd = 0

    // 维护 blockStatement and parentStatement 
    this.blockIndex = 0
    this.blockStart = 0
    this.blockEnd = 0

    this.lint = 0
    this.state = 0
  }

  add(tokenVal) {
    const length = tokenVal.length || 0
    const isSymbol = IsSymbol(getChatCode(tokenVal)) || (tokenVal === '\n')

    if (tokenVal === '\n') {
      this.lastEnd = this.end
      this.lastStart = this.start
      return this.lint += length 
    }

    // 这里还需要更准确的判断才行
    // todo 
    // 很有可能在这里出现错误
    if (!isSymbol) {
      if (this.lint > 0) {
        this.start = this.lastStart
        this.end = this.lastEnd 
        this.state = this.lint
        this.lint = 0
        return
      }
      this.start = this.position + this.state
      this.end = this.start + length
      this.position = this.end

      return
    }

    // 处理 BlockStatement 和上面同样的逻辑 但是不干扰 非符号 的处理 
    // todo 这里也需要格外的注意
    if (
      tokenVal === '{' || tokenVal === '}'
      || tokenVal === '(' || tokenVal === ')'
    ) {
      this.blockIndex = this.position

      this.blockStart = this.blockIndex
      this.blockEnd = this.blockIndex + length

      this.blockIndex = this.blockEnd
    }

    if (this.lint > 0) {
       this.lint += length
    } else {
      this.position += length
    }
    // this.position += length
    this.blockIndex += length
  }

  // 计算
  calc() {

  }

  clear() {
    this.start = 0
    this.end = 0
  }

  log() {

  }
}

const rangeMap = new RangeMap()

export default rangeMap