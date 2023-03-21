
// manageTokens 
/**
 * 管理 tokens 
 */
class ManageNode {
  constructor(parentNode) {
    this.state = 0
    this.end = 0
    this.parentNode = parentNode || undefined
  }
  
  /**
   * 完成
   * @param {*} node 
   * @param {*} type 
   */
  finish(node, type){
    node.type = type 
    node.state = this.state
    // 这里不知道该如何处理
    node.end = this.parentNode.end 
    return node 
  }

  /**
   * 合并
   * @param {*} node 
   * @param {*} position ParentNode 位置
   */
  merge(position, node){
    const target = this.parentNode[position]
    if(target && typeof target === 'array'){
      if(!node){
        return target.push(this)
      }
      return target.push(node)
    }
  }
}
