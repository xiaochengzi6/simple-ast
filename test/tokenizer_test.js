import tokenizer from "../src/tokenizer.js"

const target = `var name = 2`

const tokens = tokenizer(target)

console.log(tokens)
