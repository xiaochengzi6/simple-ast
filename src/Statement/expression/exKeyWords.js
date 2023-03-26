import ManageNode from './../../ManageNode.js'
import ExUnaryOp from './exUnaryOp.js'

import {
  ArrayLeft,
  ArrayRight,
  BlockLeft,
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
class ExKeyWords extends ExUnaryOp{
  constructor(tokens){
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
        return this.parserIdeentifier(parent)

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
        this.next()
        // todo
        return

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
}

export default ExKeyWords