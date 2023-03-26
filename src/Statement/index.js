
import ExKeyWords from './expression/exKeyWords.js'


function Deal(tokens){
  const statement = new ExKeyWords(tokens)

  return statement 
}

export default Deal