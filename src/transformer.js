import traverser from "./traverser.js";

function transformer(ast,visitor) {
  const newAst = {
    type: 'Program',
    body: [],
  }

  ast._context = newAst.body
  traverser(ast, visitor)

  return newAst;
}

export default transformer