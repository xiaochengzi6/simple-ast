
import transformer from "../src/transformer.js"

const ast = {

  "type": "Program",
  "body": [
    {
      "type": "LineFeedStatement",
      "value": "\n"
    },
    {
      "type": "VariableDeclaration",
      "value": "var"
    },
    {
      "type": "CustomNameStatement",
      "value": "number"
    },
    {
      "type": "EqualSignSymbol",
      "value": "="
    },
    {
      "type": "StringStatement",
      "value": "\"string\""
    },
    {
      "type": "LineFeedStatement",
      "value": "\n"
    },
    {
      "type": "LineFeedStatement",
      "value": "\n"
    },
    {
      "type": "FunctionDeclaration",
      "value": "function"
    },
    {
      "type": "CustomNameStatement",
      "value": "add"
    },
    {
      "type": "ParentStatementLeft",
      "value": "("
    },
    {
      "type": "CustomNameStatement",
      "value": "x"
    },
    {
      "type": "CommaStatement",
      "value": ","
    },
    {
      "type": "CustomNameStatement",
      "value": "y"
    },
    {
      "type": "ParentStatementRight",
      "value": ")"
    },
    {
      "type": "BlockStatementLeft",
      "value": "{"
    },
    {
      "type": "ReturnStatement",
      "value": "return"
    },
    {
      "type": "CustomNameStatement",
      "value": "x"
    },
    {
      "type": "AdditionStatement",
      "value": "+"
    },
    {
      "type": "CustomNameStatement",
      "value": "y"
    },
    {
      "type": "BlockStatementRight",
      "value": "}"
    },
    {
      "type": "LineFeedStatement",
      "value": "\n"
    }
  ]
}

const newAst = transformer(ast)

console.log(newAst)