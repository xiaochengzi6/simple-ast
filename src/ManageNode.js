import rangeMap from "./Statement/rangeMap.js"

/**
 * 管理 tokens 
 */
class ManageNode {
  static isKey
  constructor(isKey) {
    ManageNode.isKey = isKey

    if (!isKey) {
      this.key = Math.random().toString(32).slice(2)
      rangeMap.keys.push(this.key)
    }
  }

  /**
   * 完成
   * @param {*} node 
   * @param {*} type 
   */
  finish(type) {
    this.type = type

    if (ManageNode.isKey) return

    const obj = rangeMap.calc(this.key)

    if (obj && typeof obj === 'object') {
      const { start, end } = obj
      this.start = start
      this.end = end
    }

    // 要根据规则进行判断
    this.calcRange()

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

  /**
   * 根据规则计算自身范围
   * 
   * 计算 range 算法：
   * 1.0.0 遍历当前 node
   *   1.1.0 寻找属性为 object 的元素 
   *   1.1.1 找到该 object 的属性 {start, end}
   *   1.1.2 比较
   *   1.1.3 start 取最小 minStart， end 取最大 maxEnd
   *   1.1.4 下一次遍历
   *   1.2.0 没有找到
   *     1.2.1 下一次遍历
   *   1.3.0 遍历结束
   * 
   * 2.0.0 判断是否有属性为 object 
   *   2.1.0 没有
   *     2.1.1 直接返回
   *   2.2.0 有 
   *     2.2.1 设置当前 node {start: minStart, end: maxEnd}
   */
  calcRange() {
    const keys = Object.keys(this), starts = [], ends = []
    let isObject = false, index = 0, _super = this

    function each(keys, context) {
      // 不能超过 2 次
      if (index > 2) return
      index++

      keys.forEach(key => {
        if (typeof context[key] === 'object') {
          if (Array.isArray(context[key])) {
            // 注意 ++ 在前和在后完全不同
            context[key].forEach(obj => {
              if (typeof obj === 'object') {
                starts.push(obj.start)
                ends.push(obj.end)
              }
            })
          } else {
            const obj = context[key]

            // typeof null === 'object'
            if (obj != null) {
              starts.push(obj.start)
              ends.push(obj.end)
            }
          }

          if (!isObject) isObject = true
        }
      })
    }

    each(keys, _super)
    if (isObject) {
      // start 最小值
      // end 最大值
      const start = query(starts)
      const end = query(ends, true)
      console.log(this.key, start, end)
      if ((this.start == null) || (this.start > start)) {
        this.start = start || 0
      }
      
      if ((this.end == null) || (this.end < end)) {
        const value = rangeMap.spaceIndex
        let line = 0
        if(this.type !== rangeMap.type){
          // line = rangeMap.lineIndex || 0

          // 取出后重置为 0
          rangeMap.lineIndex = 0
        }
        // 这里就是处理 BlockStatement 类型中 '}'
        // 它在 ragemap 中并不会随着添加到 this.end 中 会遗留一个 
        // 这里就在这里保存
        // 复现方法:
        // function a(a, b){return a} 
        // 主要是确保最终长度一致
        if (value > 0) {
          rangeMap.spaceIndex = 0
          
          return this.end = end + value + line 
        }
        this.end = end + line 
      }
    }

    return
  }
}

export default ManageNode


// 双指针查找数组 最大 or 最小 指
function query(arr, isMax) {
  let i = 0
  for (let j = 0; j < arr.length; j++) {
    if (isMax) {
      // !arr[j] 确保 空元素能被跳过
      if (!arr[i] || (arr[j] > arr[i])) {
        i = j
      }
    } else {
      if (!arr[i] || (arr[j] < arr[i])) {
        i = j
      }
    }
  }

  return arr[i]
}