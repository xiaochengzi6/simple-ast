import ParserKeywords from "./ParserKeywords.js"


/**
 * 第一层
 * 处理 function , new , [] , {} , () 
 */
class ManageFunction extends ParserKeywords{
  constructor(tokens){
    super(tokens)
  }

  /**
   * 开始处理 语法规则
   */
  parserStatement(){

  }
}


export default ManageFunction