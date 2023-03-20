
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

export const visitor = {
  program:{
    enter(node,parent){},
    exit(node, parent){}
  },
  
  NumberStatement: {
    enter(node, parent) {
      parent._context.push({
        type: 'NumberStatement',
        value: node.value
      });
    },
    exit(node, parent){

    }
  },
  CustomNameStatement: {
    enter(node, parent) {
      parent._context.push({
        type: 'CustomNameStatement',
        value: node.value
      });
    },
  },
  ParentStatement: {
    enter(node, parent) {
      let expression = {
        type: 'ParentStatement',
        //targetfunction:目标函数
        targetfunction: {
          type: 'nameoffunction',
          name: node.ParentStatement
        },
        arguments: [],
      };
      node._context = expression.arguments;
      if (parent.type !== 'ParentStatement') {
        //expression:表达式
        expression = {
          //ExpressionStatement:表达式语句
          type: 'ExpressionStatement',
          expression: expression,
        };
      }
      parent._context.push(expression);
    },
  }
}
