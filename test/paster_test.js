import parser from "../src/parser.js"
import tokenizer from "../src/tokenizer.js"



const target = `
function add(x, y) { return x + y}
`

const tokens = tokenizer(target)

const result = JSON.stringify(parser(tokens))

console.log(result)