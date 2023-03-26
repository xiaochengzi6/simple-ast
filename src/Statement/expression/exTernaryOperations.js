import { ColonSymbol, Question } from '../../../utils/index.js';
import ManageNode from '../../ManageNode.js'
import ExAmount from './exAmount';

/**
 * 三元运算符号
 */
class ExTernaryOperation extends ExAmount {
  constructor(tokens) {
    super(tokens)
  }
  
  ParseTernaryOperation(parent) {
    const logicValue = this.parseExLogic(parent)

    if (this.test(Question)) {
      const node = new ManageNode(logicValue)
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