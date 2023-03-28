import tokenizer from "../src/tokenizer.js"

const target = `function a (a, b){return a < b}`

const tokens = tokenizer(target)

console.log(tokens)
