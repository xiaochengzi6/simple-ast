// 各种标点符号
export const PunctuationType = {

  "91": {
    value: "[",
    type: "ArraySymbolLeft",
    charCode: 91,
    recursion: true
  },
  "93": {
    value: "]",
    type: "ArraySymbolRight",
    charCode: 93,
    recursion: true
  },

  "123": {
    value: "{",
    type: "BlockSymbolLeft",
    charCode: 123,
    recursion: true,
  },
  "125": {
    value: "}",
    type: "BlockSymbolRight",
    charCode: 125,
    recursion: true,
  },

  "40": {
    value: "(",
    type: "ParentSymbolLeft",
    charCode: 40,
    recursion: true,
  },
  "41": {
    value: ")",
    type: "ParentSymbolRight",
    charCode: 41,
    recursion: true,
  },

  "44": {
    value: ",",
    type: "CommaSymbol",
    charCode: 44
  },

  "58": {
    value: ":",
    type: "ColonSymbol",
    charCode: 58
  },

  "59": {
    value: ";",
    type: "SemiSymbol",
    charCode: 59
  },

  "46": {
    value: ".",
    type: "DotSymbol",
    charCode: 46
  },

  "63": {
    value: "?",
    type: "QuestionSymbol",
    charCode: 63
  },

  /**
   * 正则的处理
   * var a = /src/
   * 当处理 / / 这样的符号是要和 注释 // 分开区分 
   */
  "47": {
    value: "/",
    type: "SlashSymbol",
    charCode: 47
  },

  // "//" 相当于 "\" 反斜杠
  "92": {
    value: "//",
    type: "CommentSymbol",
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
    type: "AdditionSymbol",
    charCode: 43,
  },

  "45": {
    value: "-",
    type: "SubtractionSymbol",
    charCode: 45
  },

  "42": {
    value: "*",
    type: "MultiplicationSymbol",
    charCode: 42
  },

  "47": {
    value: "/",
    type: "DividionSymbol",
    charCode: 47
  },

  "37": {
    value: "%",
    type: "PercentSymbol",
    charCode: 37
  },
  "33":{
    value: "!",
    type: "ExclaSymbol",
    charCode: 33
  },
  // 空格
  "32": {
    value: " ",
    type: "SpaceSymbol",
    charCode: 32
  },

  // 关系运算符
  "60": {
    value: "<",
    type: "LessthanSymbol"
  },
  "61": {
    value: "=",
    type: "EqualSignSymbol",
    charCode: 61
  },
  "62":{
    value: ">",
    type: "GreaterThanSymbol",
    charCode: 62
  },

  // 逻辑运算
  "124":{
    value: "|",
    type: "OrOperaSymbol",
    charCode: 124
  },
  "38": {
    value: "&",
    type: "AndOperaSymbol",
    charCode: 38
  }
}

// 符号 charCode
export const SymbolCharCode = Object.keys(PunctuationType).map(ele => (Number(ele)))

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

const _Comma = '44'
const _ParentLeft = '40'
const _ParentRight = '41'
const _BlockLeft = '123'
const _BlockRight = '125'
const _ArrayLeft = '91'
const _ArrayRight = '93'
const _Equal = '61'
const _DotSymbol = '46'
const _QUestion = '63'
const _Colon = '58'
const _Semi = '59'

// 符号
export const Comma = PunctuationType[_Comma].type
export const ParentLeft = PunctuationType[_ParentLeft].type
export const ParentRight = PunctuationType[_ParentRight].type
export const BlockLeft = PunctuationType[_BlockLeft].type
export const BlockRight = PunctuationType[_BlockRight].type 
export const ArrayLeft = PunctuationType[_ArrayLeft].type
export const ArrayRight = PunctuationType[_ArrayRight].type
export const EqualSignSymbol = PunctuationType[_Equal].type
export const DotSymbol = PunctuationType[_DotSymbol].type
export const Question = PunctuationType[_QUestion].type
export const ColonSymbol = PunctuationType[_Colon].type
export const SemiSymbol = PunctuationType[_Semi].type