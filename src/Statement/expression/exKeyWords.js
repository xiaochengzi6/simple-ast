
import ManageNode from './../../ManageNode.js'
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

class ExKeyWords {
  constructor(tokens) {
    supper(tokens)
  }

  parseExKeyWords(parent) {
    const node = new ManageNode(parent)
    const { type, value } = this.tokens.getToken()

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
        node.value = tokVal
        node.raw = value
        this.tokens.next()
        return node.finish("Literal")

      // 括号
      case ParentLeft:
        this.tokens.next()
        return this.parseExUnaryOp(parent)

      // 对象
      case BlockLeft:
        this.tokens.next()
        // todo
        return

      // 数组
      case ArrayLeft:
        this.tokens.next()
        let arr = [], first = true
        while (this.tokens.nextTest(ArrayRight)) {
          if (!first) {
            this.tokens.expect(Comma)
          } else {
            first = false
          }

          if (this.tokens.test(Comma)) arr.push(null)
          else arr.push(this.parseExUnaryOp(node))
        }
        node.argument = arr

        return node.finish("ArrayExpression")

      case Function:
        this.tokens.next()
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