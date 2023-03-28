import { Comma } from '../../../utils/index.js'
import ExAmount from './exAmount.js'
import ManageNode from './../../ManageNode.js'


class ExComma extends ExAmount {
  constructor(tokens){
    super(tokens)
  }

  parseComma(){
    const result = this.parseAmount()
    if(this.test(Comma)){
      const node = new ManageNode()
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