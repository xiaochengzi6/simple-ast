/**
 * ast 树的遍历
 * @param {*} ast 
 * @param {*} visitor 
 */
function traverser(ast, visitor) {
  function traverserArray(array, parent) {
    array.forEach(child => {
      traverserNode(child, parent)
    })
  }
  function traverserNode(node, parent) {
    let methods = visitor[node.type]
    if (methods && methods.enter) {
      methods.enter(node, parent)
    }
    switch (node.type) {
      case 'program':
        traverserArray(node.body, node)
        break
      case 'CallExpression':
        traverserArray(node.params, node)
        break
      case 'NumberLiteral':
        break
      default:
        break
    }
    if (methods && methods.exit) {
      methods.exit(node, parent)
    }
  } 
  traverserNode(ast, null)
}


export default traverser