import ManageFunction from './ManageFunction.js'

/**
 * 第二层
 * 
 * 处理
 *   函数的调用 ， ` . `: 点访问法 , []: 括号访问法 
 *  
 */
class ManageCallback extends ManageFunction{
  constructor(tokens){
    super(tokens)
  }
}


export default ManageCallback