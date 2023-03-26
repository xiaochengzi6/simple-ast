import parser from "../src/parser.js"
import tokenizer from "../src/tokenizer.js"



const target = 'var a = 1'

const tokens = tokenizer(target)

console.log(tokens)

const result = parser(tokens)

console.log(result)