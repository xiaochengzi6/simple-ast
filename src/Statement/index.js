import Ex from "./expression/index.js"

function Deal(tokens){
  const statement = new Ex(tokens)

  return statement 
}

export default Deal