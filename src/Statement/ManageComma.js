
import ManageLogical from './ManageLogical';

/**
 * 第八层
 * 
 * 处理逗号
 */
class ManageComma extends ManageLogical {
  constructor(tokens) {
    super(tokens)
  }


  /**
   * 开始处理语法
   */
  parserStatement(){

  }
}

export default ManageComma