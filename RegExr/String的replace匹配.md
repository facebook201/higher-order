### replace  (string.prototype.replace)

replace是string对象上正则匹配的方法。   返回一个由**替换值替换一些或所有匹配模式后的新字符串。不会改变原字符串。 模式可以是一个字符串或者一个正则。 替换值可以是一个字符串或者是一个每次匹配都要调用的函数。**

> 注意这里 着重介绍正则替换。  而且要非常注意是每一次匹配都要调用的函数。 所以就是说 每一次匹配到的结果会暂时返回到回调函数的第一个参数。 接着会再次匹配正则。直到匹配到没有为止。



### 语法

>str.replace(regexp|substr, newStr|function);



### 参数

* regexp 一个RegExp对象或其字面量。该正则所匹配的内容会被第二个参数的返回值替换掉

  ​

* substr 一个要被newStr 替换掉的字符串。 它是一个字符串。不是一个正则。 而且仅仅第一个匹配会被替换



* newStr 用来替换第一个参数原字符串所匹配到的部分字符串。 



* function(replacement) 一个用来创建新子字符串的函数 该函数的返回值将替换掉第一个参数匹配到的结果

  **当匹配执行后。 该函数就会执行。函数的返回值作为替换字符串。注意 如果第一个参数是正则。 且为全局匹配模式 那么这个方法就会被调用多次。每次匹配都会被调用**

  * match 匹配函数的第一个参数 匹配到的子字符串 

  * p1, p2  表示的是第n个括号匹配的字符串 如果没有括号 就返回后面的参数 offset字符串的偏移量 和 string 匹配的原字符串。

    ```javascript
    String.prototype.firstUpperCase = function() {
        // 匹配开头 字符 转换为大写
      	return this.replace(/^\w/, function(s, p1, p2){
          	console.log(s, p1, p2);
            return s.toUpperCase();
        });
    }

    'abc'.firstUpperCase(); //   'a' 0 'abc' 匹配到的子字符 偏移量 和 原字符
    // 最终返回的结果是 Abc

    // 第二个例子是有括号的正则匹配
    String.prototype.camzlie = function(str){
        return str.replace(/-(\w)?/g, function(match, p1){
            return p1 ? p1.toUpperCase() : '';
        })
    }

    'background-color'  backgroundColor
    ```

    ​



##### 首先简单介绍一下 字符匹配

```javascript
// reg对象 匹配到的内容 会被第二个参数的返回值替换
var result = 'abca'.replace(/a/g, 'l');  // 全局匹配所有的a字符 然后替换为l
result; // lbcl

// str匹配 会被第二个字符替换。且只会替换第一个匹配内容
var result = 'abca'.replace('a', 'l');

result; // lbca 第二个没有被替换掉


```





###  RegExp.prototype.test 方法

**执行一个检索 用来查看正则表达式与指定的字符串是否匹配 返回true or false**

**当你想要知道一个模式是否存在于一个字符串中。 就可以用test()。 而search方法 返回索引。 如果没有找到就返回-1。 **



```javasc
let str = 'hello world';

// 测试hello是否存在字符串的最开始位置
/^hello/.test(str); // true


// 













```





### RegExp.prototype.exec 

**exec 在一个指定字符串中执行一个搜索匹配、 返回一个结果数组或者null** 如果你只是判断是否匹配 可以使用 test。

```javascript
regexObj.exec(str);
```

















































