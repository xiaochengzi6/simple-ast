import ManageNode from '../../ManageNode.js'
import ExTernaryOperation from './exTernaryOperations.js'


/**
 * 处理 +=， -=， =
 */
class ExAmount extends ExTernaryOperation {
  constructor(tokens) {
    super(tokens)
  }

  parseAmount() {
    const result = this.parseTernaryOperations()
    const { before, value } = this.getToken()

    if (before) {
      const node = new ManageNode()
      node.operator = value
      node.left = result 
      this.next()
      node.right = this.parseAmount()

      return node.finish("AssignmentExpression")
    }

    return result
  }
}

export default ExAmount