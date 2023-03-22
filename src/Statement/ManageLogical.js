import ManageTernary from './ManageTernary';

/**
 * 第七层
 * 
 * 处理逻辑运算符号
 *  = += -= 之类的
 */
class ManageLogical extends ManageTernary {
  constructor(tokens){
    super(tokens)
  }

}

export default ManageLogical