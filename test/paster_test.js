import parser from "../src/parser.js"
import tokenizer from "../src/tokenizer.js"
import stringifyObject from 'stringify-object'
import rangeMap from "../src/Statement/rangeMap.js"

const target = `function a(a, b){return a > b}`

const tokens = tokenizer(target)
console.log(tokens)
const result = parser(tokens)
console.log(target.length)
rangeMap.log()
console.log(stringifyObject(result))   