import ExComma from "./exComma.js"

class Ex extends ExComma{
  constructor(tokens){
    super(tokens)
  }

  parseExpression(){
    return this.parseComma()
  }
}

export default Ex