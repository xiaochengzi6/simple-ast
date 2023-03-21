function generrator(newAst) {
  switch (newAst.type) {
    case 'Program':
      return newAst.body.map(generrator)
        .join('\n');
    case 'ExpressionStatement':
      return (
       generrator(newAst.expression) +
        ';' 
      );
    case 'CallExpression':
      return (
       generrator(newAst.callee) +
        '(' +
        newAst.arguments.map(generrator)
          .join(', ') +
        ')'
      );
    case 'Identifier':
      return newAst.name;
    case 'NumberLiteral':
      return newAst.value;
    case 'StringLiteral':
      return '"' + newAst.value + '"';
    default:
      throw new TypeError(newAst.type);
  }
}