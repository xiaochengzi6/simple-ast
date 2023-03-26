
/**
 * 管理 tokens 
 */
class ManageNode {
  constructor(parentNode) {
    let end = 0
    if(parentNode){
      end = parentNode.end 
    }
    this.start = end + 1
    this.end = null 
    this.parentNode = parentNode || undefined
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
}

export default ManageNode
