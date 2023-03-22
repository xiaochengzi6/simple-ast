import ManageUnaryOp from "./MangeUnaryOp";

/**
 * 第五层
 * 
 * 优先处理 如  instance 
 */
class MangePriority extends ManageUnaryOp{
  constructor(tokens){
    super(tokens)
  }
}



export default MangePriority
