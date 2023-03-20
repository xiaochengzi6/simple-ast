import { visitor } from "../src/traverser.js"
import transformer from "../src/transformer.js"

const ast = {
  "type": "Program",
    "body": [
      {
        "type": "FunctionDeclaration",
        "value": "function"
      },
      {
        "type": "CustomNameStatement",
        "value": "add"
      },
      {
        "type": "ParentStatement",
        "value": "x",
        "body": [
          {
            "type": "CommaStatement",
            "value": ","
          },
          {
            "type": "CustomNameStatement",
            "value": "y"
          }
        ]
      },
      {
        "type": "BlockStatement",
        "value": "return",
        "body": [
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
          }
        ]
      }
    ]
}

const newAst = transformer(ast, visitor)

console.log(newAst)