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
