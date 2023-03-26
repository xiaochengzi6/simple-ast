
import { Comma } from '../../../utils';
import ExAmount from './exAmount';
import ManageNode from './../../ManageNode';


class ExComma extends ExAmount {
  constructor(tokens){
    super(tokens)
  }

  parseComma(parent){
    const result = this.parseAmount(parent)
    if(this.test(Comma)){
      const node = new ManageNode(parent)
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