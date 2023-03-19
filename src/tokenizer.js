import { IsNumber, IsSymbol, IsVariableLetter, getChatCode, KeywordType, getPunctuation } from '../utils/index.js'
import { IsString } from './../utils/index.js';

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
    readToken(char)
  }

  function readToken(char) {
    // 字母
    if (IsVariableLetter(char)) {
      readLetter(char)
    }

    // 数字
    else if (IsNumber(char)) {
      readNumber(char)
    }

    // 符号
    else if (IsSymbol(char)) {
      readSymbol(char)
    }

    // 字符串 ( ', " ) || 模板字符串 ( ` )
    else if (IsString(char)) {
      readString()
    }


    else {
      throw TypeError(`出现不能解释的语法${char}`)
    }
  }

  function readLetter(char) {
    let value = ''

    // 必须设置 current < input.length
    while (IsVariableLetter(char) && current < input.length) {
      value += input[current++]

      char = getChatCode(input[current])
    }

    // 关键词处理
    // 问题：不能处理 else if 
    const keywordNode = KeywordType[value]
    if (keywordNode != null && value === keywordNode.keyword) {

      return tokens.push({
        type: keywordNode.type,
        kind: value,
        value
      })
    }

    // 默认的
    return tokens.push({
      type: 'CustomNameStatement',
      value
    })
  }

  function readNumber(char) {
    let value = ''

    while (IsNumber(char)) {
      value += input[current++]

      char = getChatCode(input[current])
    }

    return tokens.push({
      type: 'NumberStatement',
      value
    })
  }

  function readSymbol(char) {

    // 处理空格
    if (char === 32) {
      // 默认不处理
      current++
      return
    }

    // 处理反斜杠
    if (char === 92) {
      // \n \u \x \0
    }

    const { value, type, charCode } = getPunctuation(char)
    current++

    return tokens.push({
      type,
      value
    })
  }

  function readString() {
    let value = ''
    const currentValue = input[current++]
    value += currentValue

    let target = input[current]

    // ' "  前两个 以什么开始就以什么结束， ( ` ) 模板字符串
    while (target !== currentValue) {
      value += input[current++]

      target = input[current]
    }

    if (input[current] === currentValue) {
      value += input[current]

      current++
    }

    return tokens.push({
      type: 'StringStatement',
      value
    })
  }

  return tokens
}


export default tokenizer
