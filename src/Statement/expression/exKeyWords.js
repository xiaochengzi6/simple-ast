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
  KeywordType,
  NUMBERSTATEMENT,
  ParentLeft,
  REGESTATEMENT,
  STRINGSTATEMENT
} from './../../../utils/index.js'

const This = KeywordType["this"]
const Null = KeywordType['null']
const True = KeywordType['true']
const False = KeywordType['false']
const Function = KeywordType['function']
const New = KeywordType['new']

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
      case This:
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

      case Function:
        this.next()
        return this.parserFunction(parent)

      case New:
        // todo
        return

      case Null:
      case False:
      case True:
        // todo
        return

      default:
        // todo 
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