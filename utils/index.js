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
const PunctuationType = {

  "91": {
    value: "[",
    type: "ArrayExpressionLeft",
    charCode: 91,
    recursion: true
  },
  "93": {
    value: "]",
    type: "ArrayExpressionRight",
    charCode: 93,
    recursion: true
  },

  "123": {
    value: "{",
    type: "BlockStatementLeft",
    charCode: 123,
    recursion: true,
  },
  "125": {
    value: "}",
    type: "BlockStatementRight",
    charCode: 125,
    recursion: true,
  },

  "40": {
    value: "(",
    type: "ParentStatementLeft",
    charCode: 40,
    recursion: true,
  },
  "41": {
    value: ")",
    type: "ParentStatementRight",
    charCode: 41,
    recursion: true,
  },

  "44": {
    value: ",",
    type: "CommaStatement",
    charCode: 44
  },

  "58": {
    value: ":",
    type: "ColonStatement",
    charCode: 58
  },

  "59": {
    value: ";",
    type: "SemiStatement",
    charCode: 59
  },

  "46": {
    value: ".",
    type: "DotStatement",
    charCode: 46
  },

  "63": {
    value: "?",
    type: "QuestionStatement",
    charCode: 63
  },

  /**
   * 正则的处理
   * var a = /src/
   * 当处理 / / 这样的符号是要和 注释 // 分开区分 
   */
  "47": {
    value: "/",
    type: "SlashStatement",
    charCode: 47
  },

  // "//" 相当于 "\" 反斜杠
  "92": {
    value: "//",
    type: "CommentStatement",
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
  "43": {
    value: "+",
    type: "AdditionStatement",
    charCode: 43
  },

  "45": {
    value: "-",
    type: "SubtractionStatement",
    charCode: 45
  },

  "42": {
    value: "*",
    type: "MultiplicationStatement",
    charCode: 42
  },

  "47": {
    value: "/",
    type: "DividionStatement",
    charCode: 47
  },

  "37": {
    value: "%",
    type: "PercentStatement",
    charCode: 37
  },

  // 空格
  "32": {
    value: " ",
    type: "SpaceStatement",
    charCode: 32
  },

  "61": {
    value: "=",
    type: "EqualSignSymbol",
    charCode: 61
  },
}

// 符号 charCode
export const SymbolCharCode = Object.keys(PunctuationType).map(ele => (Number(ele)))

// 保留字 or 关键字
export const KeywordType = {
  debugger: {
    keyword: "debugger",
    type: "DebuggerStatement"
  },

  do: {
    keyword: "do",
    type: "DoStatement"
  },

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

  else: {
    keyword: "else",
    type: "ElseStatement"
  },

  // 这里不知道这样设置是否正确
  elseIf: {
    keyword: "else if",
    type: "IfStatement"
  },

  switch: {
    keyword: "switch",
    type: "SwitchStatement"
  },

  case: {
    keyword: "case",
    type: "CaseStatement"
  },

  default: {
    keyword: "default",
    type: "DefaultStatement"
  },

  throw: {
    keyword: "throw",
    type: "ThrowStatement"
  },

  try: {
    keyword: "try",
    type: "TryStatement"
  },

  finally: {
    keyword: "finally",
    type: "Finally",
  },

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

  catch: {
    keyword: "catch",
    type: "CatchStatement"
  },

  const: {
    keyword: "const",
    type: "VariableDeclaration",
    kind: "const"
  },

  while: {
    keyword: "while",
    type: "WhileStatement"
  },

  continue: {
    keyword: "continue",
    type: "ContinueStatement"
  },

  break: {
    keyword: "break",
    type: "BreakStatement",
  },

  with: {
    keyword: "with",
    type: "WithStatement",
  },

  null: {
    keyword: "null",
    type: "NullStatement",
  },

  true: {
    keyword: "true",
    type: "TrueStatement",
  },

  false: {
    keyword: "false",
    type: "FalseStatement",
  },

  new: {
    keyword: "new",
    type: "NewStatement",
  },

  for: {
    keyword: "for",
    type: "ForStatement"
  },

  in: {
    keyword: "in",
    type: "InStatement"
  },

  instanceof: {
    keyword: "instanceof",
    type: "InstanceofStatement"
  },

  this: {
    keyword: "this",
    type: "ThisStatement"
  },

  typeof: {
    keyword: "typeof",
    type: "TypeofStatement"
  },

  void: {
    keyword: "void",
    type: "VoidStatement"
  },

  delete: {
    keyword: "delete",
    type: "DeleteStatement"
  }
}

let tokenizerTypeName = {
  "CustomNameStatement": {
    type: "CustomNameStatement"
  },
  "NumberStatement": {
    type: "NumberStatement"
  },
  "StringStatement": {
    type: "StringStatement"
  }
}

// 转义字符 \n \t \0
export const EscapeCharacterType = {
  '\n': {
    type: "LineFeedStatement",
    value: '\n'
  },

  '\0': {
    type: "NullStatement",
    value: 'null'
  },

  '\t': {
    type: 'TabulationStatement',
    // 制表符号默认 4 空格
    value: '    '
  },

  '\v': {
    type: 'VerticalStatement',
    // 垂直制表符默认为 换行
    value: '\n'
  },

  '\f': {
    type: 'PageBreakStatement',
    // 换页符号默认没有
    value: ''
  },

  '\r': {
    type: "CarriageStatement",
    // 默认回车符号为换行
    type: "\n"
  },

  '\"': {
    type: "DoubleQuotationStatement",
    value: '\"'
  },

  "\'": {
    type: "SingleQuotationStatement",
    value: "\'"
  },

  // 默认字符处理
  "Default_Symbole_Value": {
    type: "Default_Symbol_value",
  }
}

const EscapeCharacter = Object.keys(EscapeCharacterType)
const EscapeCharacterValue = Object.values(EscapeCharacterType)

// 得到所有的 token 中的 type
export const tokenTypeName = Object.assign(
  {},
  tokenizerTypeName,
  combineTokenTypeObj(KeywordType, PunctuationType, EscapeCharacterValue)
)
console.log(tokenTypeName)
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

export function IsString(char) {
  if (
    char === 39 /* ' */ ||
    char === 34 /* " */ ||
    char === 96 /* ` */
  ) {
    return true
  }
  return false
}

export function IsEscapeCharacter(char) {
  if (EscapeCharacter.includes(char)) {
    return true
  }
  return false
}
//===========================================================================
//==                                查询                                   ==
//===========================================================================

// 获得 Unicode 字符
export function getChatCode(char) {
  return String(char).charCodeAt(0)
}

// 查询符号类型
export function getPunctuation(charCode) {
  const target = PunctuationType[charCode]

  if (target != null) {
    return target
  } else {
    throw TypeError(`有其他符号没有被处理${charCode}`)
  }
}

export function checkRight(state, callback) {
  if (
    state == null ||
    state == '' ||
    state == false ||
    (typeof state === 'array' && state.length == 0) ||
    state !== state
  ) {
    if (typeof callback === 'function') {
      return callback(state)
    } else if (typeof callback === 'string') {
      console.log(callback)
    } else {
      throw TypeError(`值无法处理 ${state}`)
    }
  }
}

//===========================================================================
//==                                utils                                  ==
//===========================================================================
function combineTokenTypeObj(...arg) {
  let result = [], resultObj = {}

  for (let i = 0; i < arg.length; i++) {
    const tokensName = Object.values(arg[i])

    tokensName.forEach((obj) => {
      if (typeof obj === 'object') {
        const getObj = getObjectValue(obj, ['type', 'resursion', 'value'])

        if (Object.keys(getObj).length > 0) {
          return result.push(getObj)
        }
      }
    })
  }

  // 数组去重
  result = removal(result)

  // 组装
  result.forEach(ele => {
    if (typeof ele === 'object') {
      resultObj[ele.type] = ele
    }
    else {
      resultObj[ele] = {
        type: ele
      }
    }
  })

  return resultObj
}

// 数组去重
function removal(arr) {
  const map = new Map()
  const result = []

  arr.forEach(ele => {
    let target = typeof ele === 'object' ? ele.type : ele

    if (!map.has(target)) {
      result.push(ele)
      map.set(target, true)
    }
  })

  return result
}

// 取出想要的属性 
function getObjectValue(obj, attributes) {
  const result = {}

  Object.entries(obj).forEach(arr => {
    const [key, value] = arr
    if (attributes.includes(key)) {
      result[key] = value
    }
  })

  return result
}
