import { ArrayLeft, ArrayRight, Comma, DotSymbol, ParentRight } from "../../../utils/index.js"
import ExKeyWords from "./exKeyWords.js"
import ManageNode from './../../ManageNode.js'
import { ParentLeft } from './../../../utils/index.js'

/**
 * 处理下标
 */
class ExSubscript extends ExKeyWords {
  constructor(tokens) {
    super(tokens)
  }

  parseExSubscript(parent) {
    if (this.test(DotSymbol)) {
      const node = ManageNode(parent, this.getToken())
      node.object = parent
      node.property = this.parserIdentifier(node)
      node.computed = false

      return this.parseExSubscript(node.finish("MemberExpression"))
    }
    else if (this.test(ArrayLeft)) {
      const node = ManageNode(parent, this.getToken())
      node.object = parent
      node.property = this.parseExUnaryOp(node)
      node.computed = true
      this.expect(ArrayRight)

      return this.parseExSubscript(node.finish("MemberExpression"))
    }
    else if (this.test(ParentLeft)) {
      const node = ManageNode(parent, this.getToken())
      node.callee = parent

      let arr = [], first = true
      while (!this.test(ParentRight)) {
        if (!first) {
          this.expect(Comma)
        } else {
          first = false
        }

        arr.push(this.parseExUnaryOp(node))
      }

      node.arguments = arr
      return this.parseExSubscript(node.finish("CallExpression"))
    } else {
      return parent
    }
  }
}

export default ExSubscript