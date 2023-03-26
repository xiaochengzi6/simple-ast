import parser from "../src/parser.js"
import tokenizer from "../src/tokenizer.js"
import stringifyObject from 'stringify-object';

const target = `function a () {
  var a = 1
}`

const tokens = tokenizer(target)

const result = parser(tokens)

console.log(stringifyObject(result))  