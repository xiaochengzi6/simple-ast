import ParserKeywords from "./ParserKeywords.js"
import TokensNode from './ToKensNode';


/**
 * 第一层
 * 处理 function , new , [] , {} , () 
 */
class ManageAtom extends ParserKeywords{
  constructor(tokens){
    super(tokens)
  }

  parserAtom(parent){
    const node = new TokensNode(parent)
    const type = this.getTokenType()
    
    switch(type){
      
    }
  }
}


export default ManageAtom