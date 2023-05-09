import { SymbolCharCode,EscapeCharacterType } from "./symbol.js"

//===========================================================================
//==                                判断                                   ==
//===========================================================================

const EscapeCharacter = Object.keys(EscapeCharacterType)

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