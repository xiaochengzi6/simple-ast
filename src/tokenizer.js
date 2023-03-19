import {IsNumber, IsSymbol, IsVariableLetter, getChatCode, KeywordType} from '../utils/index.js'
import { IsString } from './../utils/index';

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
      readNumber()
    }

    // 符号
    else if (IsSymbol(char)) {
      readSymbol()
    }

    // 字符串 ( ', " ) || 模板字符串 ( ` )
    else if(IsString(char)){
      readString()
    }
    
    // 括号
    else if(1){

    }

    // 花括号
    else if(2){

    }
  }

  function readLetter() {
    let value = ''
    let target = getChatCode(input[current])

    // 必须设置 current < input.length
    while (IsVariableLetter(target) && current < input.length) {
      value += input[current]
      current++
      target = getChatCode(input[current])
    }
    
    // 关键词处理
    // 问题：不能处理 else if 
    const keywordNode = KeywordType[value]
    if(keywordNode != null && value === keywordNode.keyword){

      return tokens.push({
        type: keywordNode.type,
        kind: value,
        value
      })
    }


    // 默认的
    return tokens.push({
      type: 'name',
      value
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
      type: 'NumberStatement',
      value
    })
  }

  function readSymbol() {
  
    current++
  }

  function readString(){
    let value = ''
    let currentValue = input[current]
    let target = getChatCode(currentValue)

    // ' "  前两个 以什么开始就以什么结束， ( ` ) 模板字符串
    while(IsString(target)){
      value += input[current]
      current
      target = getChatCode(input[current])

      if(target === currentValue){
        value += input[++current]
        break
      }
    }

    return tokens.push({
      type: 'StringStatement',
      value
    })
  }

  return tokens
}


export default tokenizer



const value = 'var 123 function hellow'
const token = tokenizer(value)

console.log(token)