/**
 * 生成 ast
 * @param  tokens 
 */
function parser(token) {
    let current = 0
    function walk() {
        let tokens = token[current]
        if (tokens.type == 'VariableDeclaration') {
            current++
            return {
                Type: 'VariableDeclaration',
                value: tokens.value
            }
        }
        if (tokens.type == 'NumberStatement') {
            current++
            return {
                type: 'NumberStatement',
                value: tokens.value
            }
        }
        if (tokens.type == 'FunctionDeclaration') {
            current++
            return {
                type: 'FunctionDeclaration',
                value: tokens.value
            }
        }
        if (tokens.type == 'name') {
            current++
            return {
                type: 'name',
                value: tokens.value
            }
        }
        current++
    }

    const ast = {
        Type: 'Program',
        body: []

    }
    while (current < token.length) {
        ast.body.push(walk())
    }
    return ast

}

let a = [
    {
        "type": "VariableDeclaration",
        "kind": "var",
        "value": "var"
      },
      {
        "type": "NumberStatement",
        "value": "123"
      },
      {
        "type": "FunctionDeclaration",
        "kind": "function",
        "value": "function"
      },
      {
        "type": "name",
        "value": "hellow"
      }
]
let c = parser(a)
console.log(c)
export default paster
