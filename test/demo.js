//  \n \0 \t \v \f \r \" \' \\ 

const symbol = ['\n', '\0', '\t', '\v', '\f', '\r', '\"', "\'", "\\"]

function names (arg){
  arg.forEach((ele) =>{
    const value = IsEscapeCharacter(ele)
    console.log(value)
  })
}

names(symbol)

function IsEscapeCharacter(char){
  if(symbol.includes(char)){
    return true 
  }
  return false 
}
