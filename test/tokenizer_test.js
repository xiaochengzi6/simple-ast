import tokenizer from "../src/tokenizer.js"

const value = 'var name = 89'
const token = tokenizer(value)

console.log(token)
