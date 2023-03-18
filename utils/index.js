//===========================================================================
//==                                常量                                   ==
//===========================================================================
export const LetterCode = {
  // a -z code: 97 -> 122
  a: 97,
  b: 98,
  c: 99,
  d: 100,
  e: 101,
  f: 102,
  g: 103,
  h: 104,
  i: 105,
  j: 106,
  k: 107,
  l: 108,
  m: 109,
  n: 110,
  o: 111,
  p: 112,
  q: 113,
  r: 114,
  s: 115,
  t: 116,
  u: 117,
  v: 118,
  w: 119,
  x: 120,
  y: 121,
  z: 122,
  // A - Z  code: 65 -> 90
  A: 65,
  B: 66,
  C: 67,
  D: 68,
  E: 69,
  F: 70,
  G: 71,
  H: 72,
  I: 73,
  J: 74,
  K: 75,
  L: 76,
  M: 77,
  N: 78,
  O: 79,
  P: 80,
  Q: 81,
  R: 82,
  S: 83,
  T: 84,
  U: 85,
  V: 86,
  W: 87,
  X: 88,
  Y: 89,
  Z: 90
}

export const numberCode = {
  "0": 48,
  "1": 49,
  "2": 50,
  "3": 51,
  "4": 52,
  "5": 53,
  "6": 54,
  "7": 55,
  "8": 56,
  "9": 57
}

// 各种标点符号
export const Punctuation = {
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

// 符号 charCode
export const SymbolCharCode = [
  91, 93, 123, 125, 40, 41, 44, 58, 59, 46, 63, 47, 92, 43, 45, 42, 47, 37, 32
]

// 保留字 or 关键字
export const keywordTypes = {
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
}

//===========================================================================
//==                                判断                                   ==
//===========================================================================
/**
 * 字母
 * @param {*} char 
 * @returns 
 */
export function IsVariableLetter(char) {
  if (char < 65) {
    return char === 36
  }
  else if (char < 91) return true
  else if (char < 97) {
    return char === 95
  }
  else if (char < 123) return true

  return false
}


export function IsSymbol(char) {
  return SymbolCharCode.includes(char)
}

export function IsNumber(char) {
  return char > 47 && char < 58
}

export function getChatCode(char) {
  return String(char).charCodeAt(0)
}