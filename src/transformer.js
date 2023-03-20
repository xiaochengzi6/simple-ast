import traverser from "./traverser.js";

function transformer(ast) {
  const newAst = {
    type: 'Program',
    body: [],
  }
  const visitor = {
    LineFeedStatement: {
      enter(node, parent) {
        parent._context.push({
          type: 'LineFeedStatement',
          value: node.value
        })
      }
    },
    VariableDeclaration:{
      enter(node,parent){
        parent._context.push({
          type:'VariableDeclaration',
          value:node.value
        })
      }
    },
    EqualSignSymbol:{
      enter(node,parent){
        parent._context.push({
          type:'EqualSignSymbol',
          value:node.value
        })
      }
    },
    StringStatement:{
      enter(node,parent){
        parent._context.push({
          type:'StringStatement',
          value:node.value
        })
      }
    },
    FunctionDeclaration:{
      enter(node,parent){
        parent._context.push({
          type:'FunctionDeclaration',
          value:node.value
        })
      }
    },
    ReturnStatement:{
      enter(node,parent){
        parent._context.push({
          type:'ReturnStatement',
          value:node.value
        })
      }
    },
    ArrayExpression: {
      enter(node, parent) {
        parent._context.push({
          type: 'ArrayExpression',
          value: node.value
        })
      }
    },
    NumberStatement: {
      enter(node, parent) {
        parent._context.push({
          type: 'NumberStatement',
          value: node.value
        });
      },
      exit(node, parent) {

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
    BlockStatement: {
      enter(node, parent) {
        let func = {
          type: 'func',
          getfunc: {
            type: '',
            name: node.BlockStatement
          },
          arguments: []
        }
        node._context = func.arguments
        if (parent.type != 'BlockStatement') {
          func = {
            type: '',
            func: func
          }
        }
        parent._context.push(func);
      }
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
          arguments: []
        }
        node._context = expression.arguments
        if (parent.type !== 'ParentStatement') {
          //expression:表达式
          expression = {
            //ExpressionStatement:表达式语句
            type: 'ExpressionStatement',
            expression: expression
          };
        }
        parent._context.push(expression);
      }
    }
  }
  ast._context = newAst.body
  traverser(ast, visitor)

  return newAst;
}

export default transformer