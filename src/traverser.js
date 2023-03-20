import { visitor } from "./visitor.js"
/**
 * ast 树的遍历
 * @param {*} ast 
 * @param {*} visitor 
 */
function traverser(ast) {

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
      case 'Program':
        traverserArray(node.body,node)
        break
        case'':
      case 'BlockStatement':
        traverserArray(node.body, parent)
        break
      case 'ParentStatement':
        traverserArray(node.body, parent)
        break
      case 'ArrayExpression':
        traverserArray(node.element, parent)
        break
      case 'CustomNameStatement':
      case 'NumberStatement':
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
