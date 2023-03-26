import tokenizer from "../src/tokenizer.js"

const value = `
var b = c ===
`
const token = tokenizer(value)

console.log(token)
