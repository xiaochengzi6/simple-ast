import ManageNode from './../../ManageNode.js'
import ExUnaryOp from './exUnaryOp.js'

import {
  ArrayLeft,
  ArrayRight,
  BlockLeft,
  BlockRight,
  ColonSymbol,
  Comma,
  IDENTIFIER,
  NUMBERSTATEMENT,
  ParentLeft,
  REGESTATEMENT,
  STRINGSTATEMENT,
  _This,
  _Null,
  _True,
  _False,
  _Function,
  _New
} from './../../../utils/index.js'



/**
 * 关键词处理
 */
class ExKeyWords extends ExUnaryOp {
  constructor(tokens) {
    super(tokens)
  }

  parseExKeyWords(parent) {
    const node = new ManageNode(parent, this.getToken())
    const { type, value } = this.getToken()

    switch (type) {
      // this 
      case _This:
        return node.finish("ThisExpression")

      // 标识符
      case IDENTIFIER:
        return this.parserIdentifier(parent)

      // number || string || reg
      case NUMBERSTATEMENT:
      case STRINGSTATEMENT:
      case REGESTATEMENT:
        node.value = value
        // 这里是拿到他的范围
        node.raw = value

        this.next()
        return node.finish("Literal")

      // 括号
      case ParentLeft:
        this.next()
        return this.parseExUnaryOp(parent)

      // 对象
      case BlockLeft:

        return this.parseObj()

      // 数组
      case ArrayLeft:
        this.next()
        let arr = [], first = true
        while (!this.test(ArrayRight)) {
          if (!first) {
            this.expect(Comma)
          } else {
            first = false
          }

          if (this.test(Comma)) arr.push(null)
          else arr.push(this.parseExUnaryOp(node))
        }
        node.argument = arr

        return node.finish("ArrayExpression")

      case _Function:
        this.next()
        return this.parserFunction(parent)

      case _New:
        // todo
        return

      case _Null:
      case _False:
      case _True:
        const node = new ManageNode(parent)
        node.value = this.getTokenValue()
        // todo
        // 这里保持和例子 https://astexplorer.net/ 相同就行
        // demo: var a = true 
        node.raw = value
        this.next()
     
        return node.finish("Literal")

      default:
        // todo 
        console.log("EX_KEYWORD: 不应该出现这种问题")
        return
    }
  }

  parseObj(parent) {
    const node = new ManageNode(parent)
    let first = true
    node.properties = []
    this.next()

    while (!this.test(BlockRight)) {
      if (!first) {
        this.expect(Comma)
      } else {
        first = false
      }

      const prop = { key: this.parseObjKey(node) }

      if (this.test(ColonSymbol)) {
        prop.value = this.parseExpression(node)
        prop.kind = "init"
      }

      // todo 
      // 这里并没有对 es6 以及  get set 做任何处理

      node.properties.push(prop)
    }

    return node.finish("ObjectExpression")
  }

  parseObjKey(parent) {
    if (this.getTokenType === ("NumberStatement" || "StringStatement")) {
      return this.parseExKeyWords(parent)
    }

    return this.parserIdentifier(parent)
  }
}

export default ExKeyWords