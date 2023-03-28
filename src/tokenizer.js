import {
  IsNumber,
  IsSymbol,
  IsVariableLetter,
  getChatCode,
  KeywordType,
  getPunctuation,
  IsEscapeCharacter,
  IDENTIFIER,
  REGESTATEMENT
} from '../utils/index.js'
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

  // todo 重构成 switch 
  function readToken(char) {
    // 字母
    if (IsVariableLetter(char)) {
      return readLetter(char)
    }

    // 数字
    else if (IsNumber(char)) {
      return readNumber(char)
    }

    // 符号
    else if (IsSymbol(char)) {
      return readSymbol(char)
    }

    // 字符串 ( ', " ) || 模板字符串 ( ` )
    else if (IsString(char)) {
      return readString(char)
    }

    // 处理 \n \t 等字符
    else if (IsEscapeCharacter(input[current])) {
      return readSlash()
    }

    else {
      throw TypeError(`出现不能解释的语法${char}'${input[current]}'`)
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
    // 这里的问题 应该在 parser 阶段处理 
    const keywordNode = KeywordType[value]
    if (keywordNode != null && value === keywordNode.keyword) {

      return tokens.push({
        type: keywordNode.type,
        kind: value,
        value
      })
    }

    // 标识符
    return tokens.push({
      type: IDENTIFIER,
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

  // todo
  // 这段函数重构程 switch 
  function readSymbol(char) {

    // todo 
    // 这里后面给提到 walk 里面 如果有直接去跳过
    // 处理空格
    if (char === 32) {
      // 默认不处理
      current++
      return
    }

    // 一元操作符：处理 ++ -- 
    if (char === 43 || char === 45) {
      const nextCurrent = current + 1
      const next = input[nextCurrent]

      let { value: nextValue, type, charCode } = getPunctuation(getChatCode(next))
      if (charCode && charCode === char) {
        current = nextCurrent + 1
        nextValue += String.fromCharCode(char)

        return tokens.push({
          type,
          value: nextValue,
          prefix: true,
          isUpdate: true,
          postfix: true
        })
      } else {
        // todo 处理 += -=
        if (charCode === 61) {
          nextValue += String.fromCharCode(char)
          current++
          return tokens.push({
            type,
            value: nextValue,
            before: true
          })
        }

        const result = matheOperation(char)
        current++

        return result
      }
    }

    // 处理正则 / 及 注释
    if (char === 47) {
      let content = input[++current]
      let charCode = getChatCode(content)
      let value = ''
      let IsCommemt = false, first = true

      // 当行注释
      if (char === 47) {
        content == input[++current]
        while (content !== '\n') {
          content = input[++current]
        }
        current++
        return
      }

      // 正则
      while (charCode !== 47) {
        if (first && charCode === 42) {
          IsCommemt = true
        }
        value += content

        charCode = getChatCode(input[++current])
      }

      // 多行注释
      if (value.slice(-2, -1) === "*") {
        current++
        return
      }

      current++
      return tokens.push({
        type: REGESTATEMENT,
        value
      })
    }

    // > or <
    if (char === 60 || char === 62) {
      const { type, value } = getPunctuation(char)
      current++
      return tokens.push({
        type,
        value,
        grad: 8
      })
    }

    // != 
    if (char === 33) {
      let nextValue = input[current + 1]
      const nextCharCode = getChatCode(nextValue)
      if (nextCharCode === 61) {
        return tokens.push({
          type: "UnequalSymbol",
          value: Stirng.fromCharCode(char) + nextValue,
          grade: 6
        })
      }
    }
    //  == or ===  
    if (char === 61) {
      let target = getChatCode(input[++current])
      let index = 0
      while (IsSymbol(target) && target === 61) {
        index++
        target = getChatCode(input[++current])
      }

      const { type } = getPunctuation(char)
      // =
      if (index === 0) {
        current++
        return tokens.push({
          type,
          value: "=",
          before: true
        })
      }
      // ==
      else if (index === 1) {
        current++
        return tokens.push({
          type: "EqualStatement",
          value: "==",
          before: true,
          gard: 6
        })
      }
      // ===
      else if (index === 2) {
        current++
        return tokens.push({
          type: "CongruentStatement",
          value: "===",
          before: true,
          grad: 6
        })
      } else {
        throw SyntaxError("文件中语法错误")
      }
    }

    // 处理反斜杠
    if (char === 92) {
      consoel.log('TODO: 处理反斜杠')

      current++
      return
    }

    const { value, type } = getPunctuation(char)
    current++

    return tokens.push({
      type,
      value
    })
  }

  function readString(char) {
    let value = ''
    const currentValue = input[current++]
    value += currentValue

    let target = input[current]

    // ' "  前两个 以什么开始就以什么结束， ( ` ) 模板字符串
    while (target !== currentValue) {
      value += input[current++]

      // 处理反斜杠
      if (char === 92) {
        // \u \x
        console.log('TODO: 处理字符串中的反斜杠')
      }

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

  function readSlash() {
    const target = input[current]
    let result

    switch (target) {
      case '\n':
        result = {
          type: 'LineFeedStatement',
          value: '\n',
          blank: true
        }
        break
      case '\t':
        result = {
          type: 'TabulationStatement',
          // 制表符号默认 4 空格
          value: '    ',
          blank: true
        }
        break
      case '\v':
        // 垂直制表符号
        result = {
          type: 'VerticalStatement',
          // 垂直制表符默认为 换行
          value: '\v',
          blank: true
        }
        break
      case '\f':
        // 换页符号
        result = {
          type: 'PageBreakStatement',
          value: '\f',
          blank: true
        }
        break
      case '\r':
        result = {
          type: "CarriageStatement",
          // 默认回车符号为换行
          type: "\n",
          blank: true
        }
        break
      case '\"':
        result = {
          type: "StringStatement",
          value: '"'
        }
        break
      case "\'":
        result = {
          type: "StringStatement",
          value: "'"
        }
        break
      default:
        result = {
          type: "UnknownStatement",
          value: target,
          chatCode: char
        }
        break
    }

    current++
    return tokens.push(result)
  }


  return tokens
}


export default tokenizer


// 逻辑运算
function matheOperation(char) {
  const { type, value } = getPunctuation(char)
  // + or -
  if (char === (43 || 45)) {
    return {
      type,
      value,
      grad: 9
    }
  }
  // * or /
  else if (char === (42 || 47)) {
    return {
      type,
      value,
      grad: 10
    }
  }
  else {
    throw TypeError(`逻辑处理遇到不能处理的char${char}`)
  }
}