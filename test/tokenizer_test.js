import tokenizer from "../src/tokenizer.js"

const value = 'function a (){}'
const token = tokenizer(value)

console.log(token)
