import ExSubscript from './exSubscript.js'
import ManageNode from './../../ManageNode.js'


const logicTest = /&&|\|\|/
/**
 * 逻辑运算符处理
 * 这里最关键的是对 逻辑运算符的优先级进行处理
 */
class ExLogic extends ExSubscript {
  constructor(tokens) {
    super(tokens)
  }

  parseExLogic() {
    const unaryOpNode = this.parseExUnaryOp()

    return this.logic(unaryOpNode, -1)
  }

  logic(node, level) {
    const { grad } = this.getToken()

    if(grad && grad > level){
      const parNode = new ManageNode()
      parNode.left = node
      parNode.operator = this.getTokenValue()
      this.next()
      node.right = this.logic(this.parseExUnaryOp(), grad)
      node.finish(logicTest.test(parNode.operator) ? "LogicalExpression" : "BinaryExpression")
      
      return this.logic(parNode, level)
    }

    return node 
  }
}

export default ExLogic