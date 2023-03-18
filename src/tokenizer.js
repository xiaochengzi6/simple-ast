/**
 * 有限自动机
 * @param {*} input 
 * @returns ast
 */
function tokenizer(input) {
  let current = 0
  let tokens = []

  while (current < input.length) {
    // 检查函数
    if () {

    }

    // 检查变量
    if () {

    }
  }

  return tokens
}


module.exports = tokenizer

// javascript 语法
const keywordTypes = {
  debugger: { keyword: "debugger" },

  do: { keyword: "do" },

  class: { 
    keyword: "class",
    type: "ClassDeclaration" 
  },

  function: { 
    keyword: "function",
    type: "FunctionDeclaration" 
  },

  return: { 
    keyword: "return",
    type: "ReturnStatement", 
  },

  if: { 
    keyword: "if",
    type: "IfStatement" 
  },

  else: { keyword: "else" },

  // 这里不知道这样设置是否正确
  elseIf: {
    keyword: "else if",
    type: "IfStatement"
  },

  switch: { keyword: "switch" },

  case: { keyword: "case" },

  default: { keyword: "default" },

  throw: { 
    keyword: "throw",
    type: "ThrowStatement" 
  },

  try: { keyword: "try" },

  finally: { keyword: "finally" },

  let: { 
    keyword: "let",
    type: "VariableDeclaration",
    kind: "let"
   },

  var: { 
    keyword: "var",
    type: "VariableDeclaration",
    kind: "var"
  },

  catch: { keyword: "catch" },

  const: { 
    keyword: "const",
    type: "VariableDeclaration",
    kind: "const" 
  },

  while: { keyword: "while" },

  continue: { keyword: "continue" },

  break: { keyword: "break" },

  with: { keyword: "with" },

  null: { keyword: "null" },

  true: { keyword: "true" },

  false: { keyword: "false" },

  new: { keyword: "new" },

  for: { keyword: "for" },

  in: { keyword: "in" },

  instanceof: { keyword: "instanceof" },

  this: { keyword: "this" },

  typeof: { keyword: "typeof" },

  void: { keyword: "void", },

  delete: { keyword: "delete", }
};

// 各种标点符号
const Punctuation = {
  bracket: {
    bracketL: { type: "[" },
    bracketR: { type: "]" },
    type: "ArrayExpression"
  },

  brack: {
    brackL: { type: "{" },
    brackR: { type: "}" },
    type: "BlockStatement"
  },

  paren: {
    parenL: { type: "(" },
    parenR: { type: ")" },
    type: "ParenStatement"
  },

  comma: { type: "," },

  colon: { type: ":" },

  semi: { type: ";" },

  dot: { type: "." },

  question: { type: "?" },

  /**
   * 正则的处理
   * var a = /src/
   * 当处理 / / 这样的符号是要和 注释 // 分开区分 
   */
  slash: { type: "/" },

  comment: { type: "//" },

  /**
   * 数学符号的处理 
   * 加法：+ 
   * 减法：- 
   * 乘法：* 
   * 除法：/ 
   * 求模：% 
   */
}
