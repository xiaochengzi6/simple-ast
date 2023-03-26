import { BlockLeft, DotSymbol } from "../../../utils/index.js"
import ExKeyWords from "./exKeyWords.js"
import { ParentLeft } from './../../../utils/index.js'
import ManageNode from './../../ManageNode.js'

/**
 * 处理下标
 */
class ExSubscript extends ExKeyWords {
  constructor(tokens) {
    super(tokens)
  }

  parseExSubscript(parent) {

    if (this.test(DotSymbol)) {
      const node = ManageNode(parent)
      node.object = parent
      node.property = this.parserIdentifier(node)
      node.computed = false
      return this.parseExSubscript(node.finish("MemberExpression"))
    } else if (this.test(ParentLeft)) {
      const node = ManageNode(parent)

    } else if (this.test(BlockLeft)) {
      const node = ManageNode(parent)
      node.callee = parent
      node.arguments = 
      return this.parseExSubscript(node.finish("CallExpression"))
    } else {
      return parent
    }
  }
}

export default ExSubscript