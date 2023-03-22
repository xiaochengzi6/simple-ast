import ManageAtom from './ManageAtom.js'

/**
 * 第二层
 * 
 * 处理
 *   函数的调用 ， ` . `: 点访问法 , []: 括号访问法 
 *  
 */
class ManageCallback extends ManageAtom{
  constructor(tokens){
    super(tokens)
  }
}


export default ManageCallback