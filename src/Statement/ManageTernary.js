
import MangePriority from './ManagePriority';

/**
 * 第六层
 * 
 * 处理 三元表达式
 */
class ManageTernary extends MangePriority{
  constructor(tokens){
    super(tokens)
  }
}

export default ManageTernary