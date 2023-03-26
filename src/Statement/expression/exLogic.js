import ExSubscript from './exSubscript.js'

class ExLogic extends ExSubscript {
  constructor(tokens){
    super(tokens)
  }

  parseExLogic(parent){
    const unaryOpNode = this.parseExUnaryOp(parent)
    
    return unaryOpNode
  }
}

export default ExLogic