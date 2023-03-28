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

  }
}

export default ManageNode
