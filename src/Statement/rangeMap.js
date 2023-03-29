
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

    // 记录是否换行
    this.lint = 0

  }

  add(tokenVal) {
    const length = tokenVal.length || 0
    const isSymbol = IsSymbol(getChatCode(tokenVal)) || (tokenVal === '\n')
   
    // if (this.lint > 0) {
    //   this.lint += length
    // }
   
    // if (tokenVal === '\n') {
    //   this.lint += length
    // }

    // 这里还需要更准确的判断才行
    // todo 
    // 很有可能在这里出现错误
    if (!isSymbol) {
      this.start = this.position
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


    this.position += length
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