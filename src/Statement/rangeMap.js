
class RangeMap {
  constructor() {
    this.map = new Map()
    this.start = 0
    this.end = 0
    this.keys = []
    this.key = null
  }

  add(length) {
    let start, end


    this.key = this.keys[this.keys.length - 1]


    // next() 遇到空行 空格还会向下执行，这时 就遇到之前保存的 this.key 自增 1 就行
    if (this.map.get(this.key)) {
      this.start = this.end + 1
      // this.end = this.start + 1
      return
    }

    start = this.start = this.end + (this.end ? 1 : 0)
    end = this.end = this.start + (length || 1)

    // 没有 key 是一开始就不存在的
    if (this.key == null) return

    this.map.set(this.key, {
      start,
      end
    })

    this.key = null
  }

  // 计算
  calc(key) {
    const obj = this.map.get(key)

    if (obj) {
      const { start, end } = obj
      console.log(key)
      return {
        start,
        end,
        key: this.key
      }
    }
   
    return false
  }

  clear() {
    this.map.clear()
    this.key = null
  }

  log() {
    console.log(this.map)
  }
}

const rangeMap = new RangeMap()

export default rangeMap