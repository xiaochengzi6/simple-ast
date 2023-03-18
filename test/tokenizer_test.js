const tokenizer = require('../src/tokenizer')

const fun = `function add(x, y){
  return x + y
}`.split('')

var token = tokenizer(fun)

console.log(token)