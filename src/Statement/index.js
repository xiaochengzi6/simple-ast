import { ParseExpression } from "./expression"

function Deal(tokens){
  const statement = new ParseExpression(tokens)

  return statement 
}

export default Deal