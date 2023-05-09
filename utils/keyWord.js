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

export const IDENTIFIER = "IdentifierStatement"
export const STRINGSTATEMENT = "StringStatement"
export const NUMBERSTATEMENT = "NumberStatement"
export const REGESTATEMENT = "RegeStatement"

// 关键词
export const _Else = KeywordType['else'].type 
export const _Catch = KeywordType['catch'].type
export const _Finally = KeywordType['finally'].type
export const _This = KeywordType["this"].type 
export const _Null = KeywordType['null'].type 
export const _True = KeywordType['true'].type
export const _False = KeywordType['false'].type 
export const _Function = KeywordType['function'].type 
export const _New = KeywordType['new'].type 
export const _Var = KeywordType['var'].type
export const _In = KeywordType['in'].type
export const _Case = KeywordType['case'].type
export const _Default = KeywordType['default'].type
export const _While = KeywordType['while'].type


