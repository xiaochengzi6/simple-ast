/**
 * 生成 ast
 * @param  tokens 
 */
function parser(token) {
    let current = 0
    let tokens
    
    function walk() {
        tokens = token[current]
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
        if(tokens.type == 'BlockStatementLeft'){
            tokens = token[++current]
            let nodes = {
                type:'FunctionBody',
                functions: [],
            }
            while(tokens.type != 'BlockStatementRight'&&current < token.length){
                nodes.functions.push(walk())
                tokens = token[current]
            }
            current++
            return nodes
        }
        if (tokens.type == 'ParentStatementLeft') {
            tokens = token[++current]
            let node = {
                type: 'CallExpression',
                name: tokens.value,
                params: [],
              }
            tokens = token[++current]
            while (tokens.type != 'ParentStatementRight' && current < token.length) {
                node.params.push(walk())
                tokens = token[current]
            }
            current++
            return node
        }

        current++
    }

    const ast = {
        type: 'Program',
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
    ,
    {
        "type": "ParentStatementLeft",
        "value":"("
    },
    {
        "type":"name",
        "value":"hellow"
    },
    {
        "type": "NumberStatement",
        "value": "123"
    }
    ,
    {
        "type":"ParentStatementRight",
        "value":"("
    }
]
let c = parser(a)
console.log(c)
export default paster
