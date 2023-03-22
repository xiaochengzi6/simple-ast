import ManageCallback from "./MangeCallback.js"

/**
import ManageCallback from './MangeCallback';
 * 第三层 
 * 
 * 处理 一元操作符
 */
class ManageUnaryOp extends ManageCallback{
  constructor(tokens){
    super(tokens)
  }

}

export default ManageUnaryOp