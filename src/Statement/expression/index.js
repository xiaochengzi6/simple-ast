import ExComma from "./exComma.js"

class Ex extends ExComma{
  constructor(tokens){
    super(tokens)
  }

  parseExpression(){

    const node = this.parseComma()
    const index = this.current
    const preIndex = this.preCurrent()
    const tokenVal = this.getTokenValue()
    console.log(index, preIndex, this.getTokenValue())

    /**
     * todo
     * 
     * range 范围到这里就会失效，存在 问题，原因
     * 1. 提前查找下一个 teken 中间有空格或者换行 就会在这里去加载上
     * 2. 在这里处理可以让其最后一个 end 能够正确 
     * 3. 括号和 {} 问题也是这样的需要在这里给调一下
     * 4.   我认为应该在 exKeyWords 中 
     * 5.   或者实在 parserKeywords 中重新设置
     */
    if(tokenVal !== ')' || (tokenVal !== '}')){
      const value = index - tokenVal
      console.log(node)
    }

    return node 
  }
}

export default Ex