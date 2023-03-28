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

  parseTernaryOperations() {
    const logicValue = this.parseExLogic()

    if (this.test(Question)) {
      const node = new ManageNode()
      node.test = logicValue
      node.consequent = this.parseExUnaryOp()

      this.expect(ColonSymbol)

      node.alternate = this.parseExUnaryOp()
      return node.finish("ConditionalExpression")
    }

    return logicValue
  }
}

export default ExTernaryOperation