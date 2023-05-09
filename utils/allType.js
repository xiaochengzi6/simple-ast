import { EscapeCharacterType, } from "./symbol.js"
import {KeywordType, IDENTIFIER, STRINGSTATEMENT, NUMBERSTATEMENT } from './keyWord.js'
import { PunctuationType } from "./symbol.js"


const EscapeCharacterValue = Object.values(EscapeCharacterType)

const tokenizerTypeName = {
  "IdentifierStatement": {
    type: IDENTIFIER
  },
  "NumberStatement": {
    type: NUMBERSTATEMENT
  },
  "StringStatement": {
    type: STRINGSTATEMENT
  }
}

// 得到所有的 token 中的 type
export const tokenTypeName = Object.assign(
  {},
  tokenizerTypeName,
  combineTokenTypeObj(KeywordType, PunctuationType, EscapeCharacterValue)
)


//===========================================================================
//==                                utils                                  ==
//===========================================================================
function combineTokenTypeObj(...arg) {
  let result = [], resultObj = {}

  for (let i = 0; i < arg.length; i++) {
    const tokensName = Object.values(arg[i])

    tokensName.forEach((obj) => {
      if (typeof obj === 'object') {
        const getObj = getObjectValue(obj, ['type', 'recursion', 'value'])

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