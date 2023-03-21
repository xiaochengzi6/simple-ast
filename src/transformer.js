import traverser from "./traverser.js";

function transformer(ast) {
  const newAst = {
    type: 'Program',
    body: [],
  }
  
  ast._context = newAst.body
  traverser(ast)

  return newAst;
}

export default transformer