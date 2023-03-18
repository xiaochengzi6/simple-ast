import {IsNumber, IsSymbol, IsVariableLetter, getChatCode} from '../utils/index.js'

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
    // current++
    // 什么都没有检索到
    // throw TypeError(`没有检索到${tokens[current]}`)
  }
  function readToken(char) {
    // 字母
    if (IsVariableLetter(char)) {
      readLetter(char)
    }

    // 数字
    else if (IsNumber(char)) {
      readNumber()
    }

    // 符号
    else if (IsSymbol(char)) {
      readSymbol()
    }
  }

  function readLetter() {
    let value = ''
    let target = getChatCode(input[current])
    while (IsVariableLetter(target) && current < input.length) {
      value += input[current]
      current++
      target = getChatCode(input[current])
    }
    
    current++
    tokens.push({
      type: 'name',
      value: value
    })
  }

  function readNumber() {
    let value = ''
    let target = getChatCode(input[current])
    while (IsNumber(target)) {
      value += input[current]
      current++
      target = getChatCode(input[current])
    }

    return tokens.push({
      type: 'number',
      value: value
    })
  }

  function readSymbol() {
  
    current++
  }
  return tokens
}


export default tokenizer



const value = 'var 123 fnction hellow'
const token = tokenizer(value)

console.log(token)