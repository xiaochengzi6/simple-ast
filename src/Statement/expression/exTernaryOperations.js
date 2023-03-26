import ManageNode from '../../ManageNode.js'
import ParserKeywords from '../ParserKeywords.js'
//三元运算
class ternaryOperation extends ''{
  constructor(tokens){
    super(tokens)
  }
  ternaryOperation(parent){
    const lojic = ''
    const node =new ManageNode()
    if(this.test('?')){
      node.test = lojic
      node.consequent = this.parseExUnaryOp(node)
      if(this.test(':')){
        node.alternate = this.parseExUnaryOp(node)
        return node
      }
    }
    return lojic
  }
}