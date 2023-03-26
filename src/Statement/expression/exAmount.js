import ManageNode from '../../ManageNode.js'
import ExTernaryOperation from './exTernaryOperations';


/**
 * 处理 +=， -=， =
 */
class ExAmount extends ExTernaryOperation {
  constructor(tokens) {
    super(tokens)
  }

  parseAmount(parent) {
    const result = this.parseTernaryOperations(parent)
    const { before, value } = this.getToken()

    if (before) {
      const node = new ManageNode(result)
      node.operator = value
      node.left = result 
      this.next()
      node.right = this.parseAmount(node)

      return node.finish("AssignmentExpression")
    }

    return result
  }
}

export default ExAmount