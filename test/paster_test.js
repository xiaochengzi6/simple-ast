import parser from "../src/parser.js"
import tokenizer from "../src/tokenizer.js"
import stringifyObject from 'stringify-object'
import rangeMap from "../src/Statement/rangeMap.js"

const target = 
`var name = 2`
// console.log(target.length)
const tokens = tokenizer(target)
// console.log(tokens)
const result = parser(tokens)
console.log(stringifyObject(result))   