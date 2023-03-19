// 分词阶段
const tokenizerType = {
  // 关键词的 type 类型都在 utils 中命名
  // KeywordTypes 

  // 各种标点符号如 花括号，逗号等 在 /utils/index.js 中有定义
  // PunctuationType 常量
  
  // 数字类型
  number: {
    type: 'NumberStatement'
  },

  // 定义的变量名
  customName: {
    type: "CustomNameStatement"
  }, 

  // 字符串
  string:{
    type: "StringStatement"
  },

  
} 