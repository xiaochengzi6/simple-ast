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

  parseExKeyWords() {
    const node = new ManageNode()

    const { type, value } = this.getToken()

    switch (type) {
      // this 
      case _This:
        return node.finish("ThisExpression")

      // 标识符
      case IDENTIFIER:
        return this.parserIdentifier()

      // number || string || reg
      case NUMBERSTATEMENT:
      case STRINGSTATEMENT:
      case REGESTATEMENT:
        node.value = value
        // 这里是拿到他的范围
        node.raw = value
        const numberStringRegNode = node.finish("Literal")
        console.log("value:", numberStringRegNode)
        this.next()
        return numberStringRegNode

      // 括号
      case ParentLeft:
        this.next()
        return this.parseExUnaryOp()

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
        node.value = this.getTokenValue()
        // todo
        // 这里保持和例子 https://astexplorer.net/ 相同就行
        // demo: var a = true 
        node.raw = value
        const result_node = node.finish("Literal")
        this.next()
        console.log("result_node", result_node)
        return result_node

      default:
        // todo 
        console.log(`EX_KEYWORD: 不应该出现这种问题
        这种问题属于没有解析到合适的处理方法从而导致出现问题
        为了体验感 但是程序并不会出现抛错 得到的 ast 树非常有可能不符合你的意愿
        可以考虑提交 issue 到本仓库 (欢迎您!!!)
        `, this.getToken())
        return
    }
  }

  parseObj() {
    const node = new ManageNode()
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