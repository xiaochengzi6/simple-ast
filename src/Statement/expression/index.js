import ExComma from "./exComma.js"

class Ex extends ExComma{
  constructor(tokens){
    super(tokens)
  }

  parseExpression(parent){
    return this.parseComma(parent)
  }
}

export default Ex