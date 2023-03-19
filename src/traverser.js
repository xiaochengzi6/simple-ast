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
  function braverserNode(node, parent) {
    let methods = visitor[node.type]
    if (methods && methods.enter) {
      methods.enter(node, parent)
    }
  } switch (node.type) {
    case 'program':
      traverserArray(node.body, node)
      break
    case 'CallExpression':
      traverserArray(node.params, node)
      break
    case 'NumberStatement':
    case 'StringStatement':
      break
    default:
      throw new TypeError(node.type);
  }
  if (methods && methods.exit) {
    methods.exit(node, parent)
  }
  braverserNode(ast, null)
}


export default traverser