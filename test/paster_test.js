import parser from "../src/parser.js"
import tokenizer from "../src/tokenizer.js"
import stringifyObject from 'stringify-object'

const target = `try{
  var a = 1
}catch(e){
  var b = 2
}
`

const tokens = tokenizer(target)

const result = parser(tokens)

console.log(stringifyObject(result))  