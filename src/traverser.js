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
      case 'BlockStatementLeft':
        traverserArray(node.BlockStatementLeft, node)
        break
      case 'ParentStatementLeft':
        traverserArray(node.ParentStatementLeft, node)
        break
      case 'ArrayExpressionLeft':
        traverserArray(node.ArrayExpressionLeft, node)
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
let visitor = {
  program:{
    enter(node,parent){
      parent._context.push({
        type:'program',
        value:node.type
      })
    },

  },
  NumberStatement: {
    enter(node, parent) {
      parent._context.push({
        type: 'NumberStatement',
        value: node.value
      });
    },
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
function transformer(ast,visitor) {
  let newAst = {
    type: 'Program',
    body: [],
  };
  ast._context = newAst.body;
  traverser(ast, visitor);
  return newAst;
}

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