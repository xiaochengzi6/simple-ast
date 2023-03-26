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

  function walk() {
    const token = deal.getToken()
    const node = new ManageNode()
    // todo 
    // 这里可以做个判断 没有取到 token 会直接退出
    console.log("CURRENT: ", deal.current)
    console.log(deal.exit())
    if(deal.exit()){ return }

    const { type, value } = token

    // 在这里去进行关键词判断
    switch (value) {
      case 'var':
        deal.next()
        // todo 
        // 这里可以对最终的 var 表达式看看是否存在 ; 如果没有
        return deal.parserVar(node)

      case 'function ':
        deal.next()
        return deal.parserFunction(node)

      default:
        node.id = 'Default'
        node.type = type
        deal.next()
        console.log("DEFAULT: 使用默认值")
    }

    return node
  }

  while (!deal.exit()) {
    rootNode.body.push(walk())
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