import { ColonSymbol, Question } from '../../../utils/index.js'
import ManageNode from '../../ManageNode.js'
import ExLogic from './exLogic.js'

/**
 * 三元运算符号
 */
class ExTernaryOperation extends ExLogic {
  constructor(tokens) {
    super(tokens)
  }

  parseTernaryOperations(parent) {
    const logicValue = this.parseExLogic(parent)

    if (this.test(Question)) {
      const node = new ManageNode(logicValue, this.getToken())
      node.test = logicValue
      node.consequent = this.parseExUnaryOp(node)

      this.expect(ColonSymbol)

      node.alternate = this.parseExUnaryOp(node)
      return node.finish("ConditionalExpression")
    }

    return logicValue
  }
}

export default ExTernaryOperation