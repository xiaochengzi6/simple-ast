import tokenizer from "../src/tokenizer.js"

const value = `for(var a = 1; a<2;a++){
  function a () {}
  break
}
`
const token = tokenizer(value)

console.log(token)
