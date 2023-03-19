import { tokenTypeName } from "../utils/index.js"

/**
 * 生成 ast
 * @param  tokens 
 */
function parser(tokens) {
  let current = 0

  function walk() {
    let token = tokens[current]
    if(token == null) return 
    
    const { type, value } = token
    const targetObj = tokenTypeName[type]
    
    const { type: targetObjType, recursion } = targetObj

    // 递归处理 括号 花括号
    if (recursion == true) {
      // 花括号
      if (value === '{') {
        token = tokens[++current]

        const node = {
          type: "BlockStatement",
          value: token.value,
          body: []
        }

        token = tokens[++current]

        while (token.value !== '}') {
          node.body.push(walk())
          token = tokens[current]
        }

        // 跳过 "}"
        current ++
        return node
      }

      // 括号
      if (value === '(') {
        token = tokens[++current]

        const node = {
          type: "ParentStatement",
          value: token.value,
          body: []
        }

        token = tokens[++current]

        while (token.value !== ")") {
          node.body.push(walk())
          token = tokens[current]
        }

        // 跳过 ')'
        current ++
        return node
      }

      // 数组
      if (value === '[') {
        token = tokens[++current]

        const node = {
          type: "ArrayExpression",
          element: []
        }

        while (token.type !== ']') {
          node.element.push(walk())
          current++
        }

        return node
      }
    }
    else {
      // 默认的
      current ++
      return {
        type: targetObjType,
        value
      }
    }
  }

  const ast = {
    type: 'Program',
    body: []
  }

  while (current < tokens.length) {
    ast.body.push(walk())
  }
  
  return ast
}




export default parser
