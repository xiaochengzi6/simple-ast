import tokenizer from "../src/tokenizer.js"

const value = `
var a = 1 // sjdsaidsda
//dsjdkajda;
var b = 2
/*dssdd*/
// /********/
`
const token = tokenizer(value)

console.log(token)
