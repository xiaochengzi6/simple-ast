import rangeMap from '../rangeMap.js'
import ManageNode from './../../ManageNode.js'
import ParserKeywords from './../ParserKeywords.js'


class ExUnaryOp extends ParserKeywords {
  constructor(tokens) {
    super(tokens)
  }

  /**
   * 一元操作符 
   * + 
   * ++ 
   * - 
   * -- 
   * typeof 
   * delete 
   * volid
   * 
   * 参考: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Unary_negation
   * @param {*} parent 
   */
  parseExUnaryOp() {
    const node = new ManageNode()
    const { prefix, value, isUpdate } = this.getToken()
    if (prefix) {
      node.operator = value
      node.prefix = true
      this.next()
      node.argument = this.parseExUnaryOp()

      // 如果前面出现 ++ or -- 那就在这里要去判断
      if (isUpdate) {
        // ++ 变量 -- 
        // todo 
        // 规则 ： 这里之能出现 Identifier || MemberExpression
      } else if (false) {
        // 严格模式
        // todo
        // 规则：不能使用 delete 
      }
      
      return node.finish(isUpdate ? "UpdateExpression" : "UnaryExpression")
    }

    // 处理关键词
    const resultKeyword = this.parseExKeyWords()
    // 处理下标
    let resultNode = this.parseExSubscript(resultKeyword)

    // 获取最新 token 的postfix
    const { postfix } = this.getToken()
    if (postfix) {
      const node = new ManageNode()
      node.operator = resultNode
      node.prefix = false
      node.argument = resultNode

      // todo 
      // 检查一下 resultNode 是否符合要求
      // resultNode 是 Identifier or MemberExpression

      this.next()
      // 覆盖了上层了 node 说明不需要 之前的创建的 key
      
      resultNode = node.finish("UpdateExpression")
    }

    return resultNode
  }
}

export default ExUnaryOp