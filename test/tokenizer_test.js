import tokenizer from "../src/tokenizer"

const fun = `function add(x, y){
  return x + y
}`

var token = tokenizer(fun)

console.log(token)