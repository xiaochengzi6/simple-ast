import parser from "../src/parser.js"
import tokenizer from "../src/tokenizer.js"
import stringifyObject from 'stringify-object'

const target = `
switch(a){
  case "a": 
    break 
}
`

const tokens = tokenizer(target)

const result = parser(tokens)

console.log(stringifyObject(result))  