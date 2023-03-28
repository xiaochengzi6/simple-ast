### git 命令
git pull origin main 拉取

git push origin main 提交

git add . 保存文件

git commit -m "提交内容"  暂存代码


文件冲突解决办法：
1. 先冲突修改文件内容
2. git add .
3. git commit -m "修改文件冲突"


### 编译器

词法分析阶段如果对一串代码进行分词 是按个还是按空格 比如这段程序 `function $add(x, y) {return x  + y}`
参考这篇文章：
1. https://www.jianshu.com/p/04ddafb161a3 
2. https://developer.huawei.com/consumer/cn/forum/topic/0201122399608080069
3. https://zhuanlan.zhihu.com/p/423303915


### 转义字符
\0 Null字符（\u0000） 
\b 退格符（\u0008） 
\t 水平制表符（\u0009） 
\n 换行符（\u000A） 
\v 垂直制表符（\u000B） 
\f 换页符（\u000C） 
\r 回车符（\u000D） 
\" 双引号（\u0022） 
\' 撇号或单引号（\u0027） 
\\ 反斜杠（\u005C） 

\xXX 由 2 位十六进制数值 XX 指定的 不能超过 25 也就是最大为 `\xff`

\uXXXX 由 4 位十六进制数值 XXXX 指定的 Unicode 字符 

~~~js
'a'.chatCodeAt().toString(16) // 61
'\u0066' // a

// 也可以使用
'\x61'
~~~

对于中文字符就会解析为 `\uxxxx` 这样的形式
使用 `excape("中文")` 去得到 Unicode 字符
https://juejin.cn/post/6844903511222648845

### 语法分析流程
分词阶段全部处理好拿到所有 tokens 数据来到 parser 阶段 首先会根据关键词进行解析使用 那个关键词就调用那个处理函数比如
~~~js
switch(type){
  cath 'var': 
    return parserVar()
  cath 'function': 
    return parserFunction()
}
~~~
这里的 `parserVar` 和 `parserFunction` 就是专门对处理后的 token 进行关键词处理 整个阶段的 parser 处理过程主要分为两个步骤 
1. 当前节点处理
2. 预读处理

就比如 `parserVar` 函数 当处理的 token 为 `{type: "VariableDeclarator", value: "var"}` 对象时就会调用该函数，首先会进行`当前节点的处理`这里最终会返回一个对象
~~~js
{
  id: Identifier{},
  state: number,
  end: number,
  init: literal{}
  kind: "var"
}
~~~
这些属性都是在 parserVar 中去赋值的，现在假如有这样一段 `var a = 1, b = true` 已经通过分词阶段拿到所有 tokens 在 parser 阶段首先进入 `parserVar` 去对当前 节点(这里可以理解为对当前 token 或之后几个token)处理 处理好要进行 `预读处理` 根据语法规则去做处理 以下是语法解析的算法，每当对关键词的 当前节点处理完成之后就可以去进行预读处理，去解析tokens最终生成一个合适的 ast 树 

1.0.0 一元操作符

2.0.0 逻辑运算符和关系运算符

3.0.0 三元运算符

4.0.0 符号处理 `= || += || -= || ,` 


### 语法解析算法 v1.0
1.0.0 一元操作符处理
  1.1.0 前缀处理
    1.1.1 init node 
    1.1.2 node{operator: value, prefix: true}
    1.1.3 next()
    1.1.4 node.argument => 1.0.0
    1.1.5 return node 

  1.2.0 关键词处理
    1.2.1 init node 
    1.2.2 this
    1.2.3 Identifier
    1.2.4 number、string、reg
    1.2.5 null, true, false
    1.2.6 (
    1.2.7 [
    1.2.8 {
    1.2.9 function
    1.2.10 new
    1.2.11 default 
      1.2.(1~11) 处理到中间某个分支后都会返回 node

    1.2.12 处理下标
      1.2.12.1 处理 点语法
      1.2.12.2 处理数组 []
      1.2.12.3 处理括号 ()
        1.2.12.(1~3) return node
      1.2.12.4 return 1.2.0 Result

  1.3.0 后缀处理
    1.3.1 init node && resultNode = 1.2.0 返回值
    1.3.2 resultNode{operator: value, prefix: true}
    1.3.3 resultNode.argument => 1.3.0 
    1.3.5 test resultNode.argument
    1.3.6 next()
    1.3.7 return 1.2.12 Result

2.0.0 逻辑运算符和关系运算符处理
  2.1.0 逻辑运算符 && ||
  2.2.0 关系运算符
  2.3.0 instateof, in

3.0.0 三元运算符
  3.1.0 拿到 2.0.0 返回值
  3.2.0 init node  
  3.3.0 type === "?"
    3.3.1 node.test = 3.1.0
    3.3.2 node.consequent => 1.0.0
  3.4.0 type === ":"
    3.4.1 node.alternate => 1.0.0
    3.4.2 return node
  3.5.0 return 2.0.0 Result

4.0.0 处理 += -= = 
  4.1.0 拿到 3.0.0 返回值
  4.2.0
  4.3.0 type === "= || += || -="
    4.3.1 node{operator: value, left: 4.1.0}
    4.3.2 next()
    4.3.3 node{right: 4.0.0}
    4.3.4 return node 
  4.4.0 return 3.0.0

5.0.0 处理逗号 
  5.1.0 拿到 4.0.0 返回值
  5.2.0 type === ","
    5.2.0 init node
    5.2.1 node{expressions: [5.1.0] }
    5.2.2 while(type !== ",")
      5.2.2.1 node.expressions.push(1.0.0)
  5.3.0 return 4.0.0 Result 


### range 计算规则

~~~js
// if
node: {
  body:[
    {
      expression: {
        left: {start, end},
        right: {start, end}
      }
    }
  ]
}
// var 
node: {
  body: [
    {
      declarations: [
        {
          id: {start, end},
          init: {start, end}
        }
      ]
    }
  ]
}

// for 
node: {
  body: [
    {
      init: {
        declarations: [
          {
            id: {start, end},
            init: {start, end}
          }
        ]
      },
      test: {
        operator: {start, end},
        argument: {start, end},
      },
      body: []
    }
  ]
}

// function   
node: {
  body: [
    {
      id: {start, end},
      params: [
        {start, end},
        {start, end}
      ],
      body: [{
        body:[{
          argument: {
            let: {
              right: {}
            }
          }
        }]
      }]
    }
  ]
}
~~~
创建 node 可能存在前后不一致的情况但 每次node 处理完成之后的 `finish` 绝对是按照顺序完成的 先子 node 后 父 node 按照这样的方式只需要层 node 处理好自身的 start, end 就行
具体算法流程 
1.0.0 遍历当前 node
  1.1.0 寻找属性为 object 的元素 
    1.1.1 找到该 object 的属性 {start, end}
    1.1.2 比较
    1.1.3 start 取最小 minStart， end 取最大 maxEnd
    1.1.4 下一次遍历
  1.2.0 没有找到
    1.2.1 下一次遍历
  1.3.0 遍历结束
2.0.0 判断是否有属性为 object 
  2.1.0 没有
    2.1.1 直接返回
  2.2.0 有 
    2.2.1 设置当前 node {start: minStart, end: maxEnd}
  