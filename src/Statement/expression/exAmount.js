import ManageNode from '../../ManageNode.js'
import ParserKeywords from '../ParserKeywords.js'
//+=、-=、=
class amount extends ''{
  constructor(tokens){
    super(tokens)
  }
  amount(parent){
    const value = this.ternaryOperations()
    if(this.test('+=')||this.test('-=')||this.test('=')){
      const node =new ManageNode(parent)
      node.operator = true
      node.left = amount
      this.next()
      node.right = this.amount(node)
      return node
    }
    return value
  }
}