import ManageNode from "./ManageNode.js"
import Deal from "./Statement/index.js"


/**
 * 生成 ast
 * @param  tokens 
 */
function parser(tokens) {
  const deal = Deal(tokens)

  const rootNode = new ManageNode()
  rootNode.type = "Program"
  rootNode.body = []

  while (!deal.exit()) {
    rootNode.body.push(deal.walk())
  }

  return rootNode
}


export default parser


// todo 
// 抛错函数
function Warning(pos, message) {
  // todo
  // 这里去根据 input 和 pos 找到 行和列

  throw new SyntaxError(message)
}