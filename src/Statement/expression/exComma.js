import { Comma } from '../../../utils/index.js'
import ExAmount from './exAmount.js'
import ManageNode from './../../ManageNode.js'


class ExComma extends ExAmount {
  constructor(tokens){
    super(tokens)
  }

  parseComma(parent){
    const result = this.parseAmount(parent)
    if(this.test(Comma)){
      const node = new ManageNode(parent, this.getToken())
      node.expressions = [result] 
      while(!this.test(Comma)){
        node.expressions.push(this.parseAmount(node))
      }

      return node.finish("SequenceExpression")
    }

    return result 
  }

}

export default ExComma