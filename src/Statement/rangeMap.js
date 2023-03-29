
import { getChatCode, IsSymbol } from './../../utils/index.js'
class RangeMap {
  constructor() {
    this.map = new Map()
    this.start = 0
    this.end = 0
    this.keys = []
    this.key = null
    this.first = true
    // 记录空格
    // todo 
    // 存在的问题 这里准备想用跳过空格次数减去 node.end 得到最终的 end 但是还是不行
    // 每次的 end 存在一定的问题
    this.spaceIndex = 0

    // 换行符号
    // 当出现换行符号的时候就将其添加到 这里 并不会在当前节点做处理
    this.lineIndex = 0
    this.type = null  
  }

  add(tokenValue, type) {
    const length = tokenValue.length
    // todo
    // 这里的判断需要完善才行
    const isSymbol = IsSymbol(getChatCode(tokenValue)) || tokenValue === '\n'

    let start, end
    this.key = this.keys[this.keys.length - 1]

    // next() 遇到空行 空格还会向下执行，这时 就遇到之前保存的 this.key 自增 1 就行
    if (this.map.get(this.key) ||isSymbol ) {
      if (isSymbol) {
        if(tokenValue == '\n'){
          this.lineIndex += 1
          this.type = this.type ? this.type : type 
          //
          this.spaceIndex += 1
          return 
        }
        return this.spaceIndex += tokenValue.length
      } else {
       return this.spaceIndex += 1
      }
    
    }

    if (this.spaceIndex == 0) {
      start = this.start = this.end + (this.end ? 1 : 0)
      end = this.end = this.start + (length || 1)
    } else {
      start = this.start = this.end + this.spaceIndex
      end = this.end = this.start + length
    }
    // 没有 key 是一开始就不存在的
    if (this.key == null) return

    this.map.set(this.key, {
      start,
      end,
      spaceIndex: this.spaceIndex,
      length
    })

    this.key = null

    // this.sapceIndex 被保存后然后重置
    this.spaceIndex = 0
  }

  // 计算
  calc(key) {
    const obj = this.map.get(key)

    if (obj) {
      const { start, end } = obj

      // // 删除保存过的
      // this.map.delete(key)
      // this.keys = this.keys.filter((e) => e !== key)

      // // 清空
      // if(this.map.size === 0){
      //   this.clear()
      // }

      return {
        start,
        end,
        key: this.key
      }
    }

    // if(this.map.size === 0){
    //   this.clear()
    // }

    return false
  }

  clear() {
    this.map.clear()
    this.key = null
    this.keys = []
  }

  log() {
    console.log(this.map)
    console.log(this.keys)
  }
}

const rangeMap = new RangeMap()

export default rangeMap