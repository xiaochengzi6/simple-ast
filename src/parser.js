/**
 * 生成 ast
 * @param  tokens 
 */
function parser(tokens) {
    let current = 0
    function walk() {
       
       
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




export default parser
