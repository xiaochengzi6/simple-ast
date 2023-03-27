import tokenizer from "../src/tokenizer.js"

const value = `while(true){
  function a () {}
  break
}`
const token = tokenizer(value)

console.log(token)
