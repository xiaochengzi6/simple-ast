
/**
 * 管理 tokens 
 */
class ManageNode {
  static parentNode

  constructor(parentNode, token) {
    let end = 0

    if (parentNode && parentNode.end != null) {
      end = parentNode.end + 1
    }
    this.start = end

    if (token && typeof token === 'object') {
      const { value } = token
      this.end = value.length
    }

    ManageNode.parentNode = parentNode
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
    // value name kind 
    this.setEnd()
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

  setEnd() {
    if (this.end) return

    if (this.name && typeof this.name === 'string') {
      return this.addEndLength(this.name)
    }
    if (this.value && typeof this.value === 'string') {
      return this.addEndLength(this.value)
    }
    if (this.kind && typeof this.value === 'string') {
      return this.addEndLength(this.kind)
    }

    console.log("LENGTHOUT: end 长度无法设置")
  }

  addEndLength(target) {
    return this.end = this.start + target.length
  }
}

export default ManageNode
