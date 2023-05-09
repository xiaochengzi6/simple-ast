import { PunctuationType } from "./symbol.js"

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
    return false
    // throw TypeError(`有其他符号没有被处理${charCode}`)
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