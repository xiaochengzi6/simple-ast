
// tokens
[
  { type: "", value: "2" },
  { type: "", value: '+', grad: 7 },
  { type: "", value: "3" },
  { type: "", value: "*", grad: 8 },
  { type: "", value: "5" }
]


// 逻辑运算
function parseExLogic(node) {

  return logic(node, -1)
}

function logic(node, level) {
  // 取出当前 token 设置好的优先级
  const { grad } = token

  if (grad && grad > level) {
    const init = {}
    init.left = node

    init.operator = node.value

    // 获取下一个 token
    next()

    // 递归处理下一个 node
    node.right = this.logic(nextNode, grad)

    // 判断是否还存在 优先级
    // 传入 init 并判断 下一个 token 是否还存在优先级
    return this.logic(init, level)
  }

  // 结束
  // 这里返回的 node 就是保持一个深度优先的嵌套关系
  return node
}
