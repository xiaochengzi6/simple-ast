/**
 * 有限自动机
 * @param {*} input 
 * @returns ast
 */
function tokenizer(input) {
  input = String(input)

  let current = 0
  let tokens = []

  while (current < input.length) {
    let char = input[current]
    char = char.charCodeAt()
      

    // 什么都没有检索到
    throw TypeError(`没有检索到${tokens[current]}`)
  }

  return tokens
}


module.exports = tokenizer

// 保留字 or 关键字
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
    bracketL: { 
      type: "[",
      charCode: 91
    },
    bracketR: { 
      type: "]",
      charCode: 93
    },
    type: "ArrayExpression"
  },

  brack: {
    brackL: { 
      type: "{",
      charCode: 123 
    },
    brackR: { 
      type: "}",
      charCode: 125 
    },
    type: "BlockStatement"
  },

  paren: {
    parenL: { 
      type: "(",
      charCode: 40 
    },
    parenR: { 
      type: ")",
      charCode: 41 
    },
    type: "ParenStatement"
  },

  comma: { 
    type: ",",
    charCode: 44 
  },

  colon: { 
    type: ":",
    charCode: 58 
  },

  semi: { 
    type: ";",
    charCode: 59 
  },

  dot: { 
    type: ".",
    charCode: 46 
  },

  question: { 
    type: "?",
    charCode: 63 
  },

  /**
   * 正则的处理
   * var a = /src/
   * 当处理 / / 这样的符号是要和 注释 // 分开区分 
   */
  slash: { 
    type: "/",
    charCode: 47 
  },

  // "//" 相当于 "\"
  comment: { 
    type: "//",
    charCode: 92 
  },

  /**
   * 数学符号的处理 
   * 加法：+ 
   * 减法：- 
   * 乘法：* 
   * 除法：/ 
   * 求模：% 
   */
  addition: {
    type: "+",
    charCode: 43
  },

  subtraction: {
    type: "-",
    charCode: 45
  },

  multiplication: {
    type: "*",
    charCode: 42
  },

  division: {
    type: "/",
    charCode: 47
  },

  percent: {
    type: "%",
    charCode: 37
  }
}
