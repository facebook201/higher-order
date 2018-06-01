### valueOf  和 toString 方法

> Object.prototype.valueOf  将javascript对象转为原始值。 当遇到要预期的原始值的对象时，JavaScript会自动调用它。

#### 原始值类型 

Number、String、Boolean、Undefined、Null



>Object.prototype.toString 返回一个表示对象的字符串。每个对象都有一个toString方法。**当对象被表示为文本值时或者当以期望字符串的方式引用对象时，该方法被自动调用**



#### String 类型转换

在某个操作或者运算需要字符串而该对象又不是字符串的时候。会触发该对象的String转换。 系统内部会自动调用toString 函数。

```javascript
var obj = {name: 'coco'};
var str = '123' + obj;
str; // 123[object Object]
```

* 如果toString方法存在并且返回原始类型 返回toString的结果
* 如果toString方法不存在或者返回的不是原始类型 调用valueOf方法。如果存在valueOf 并返回原始类型数据 返回valueOf结果
* 其他就会抛出错误

```javascript
var arr = [1, 2];
var str = '123' + arr;
str; // '1231,2'
```

但是我们可以自己改写这两个方法。

### Function 转换

```javascript
function add() {
	var args = Array.prototype.slice.call(arguments);
	var fn = function() {
    	var arg_fn = Array.prototype.slice.call(arguments);
        return add.apply(null, args.concat(arg_fn));
    }
    fn.valueOf = function() {
    	return args.reduce(function(a, b) {
        	return a + b;
      	})
    }
    return fn;
  }
```



#### toString 作用是

![border](https://segmentfault.com/img/bVXTUy?w=668&h=384)



```javascript
({}.toString());       //=>  "[object Object]"   
[1,2].toString();      //=>  "1,2"   
true.toString();       //=>  "true"    
new Date(1970,0,1).toString();  //=>  "Thu Jan 01 1970 00:00:00 GMT+0800 (CST)"    

Error("一个错误信息").toString();    //=>  "Error: 一个错误信息"    

(function (x){return x}).toString();   //=>  "function (x){return x}"     

/\d/.toString();    //=>  "/\\d/"
```



#### valueOf 方法 作用是

如果对象存在任意原始值 默认将对象转换为表示它的原始值 对象是复合值大多数对象无法真正表示为一个原始值，因此默认的valueOf( )方法简单地返回对象本身，而不是返回一个原始值。

数组、函数、和正则表达式简单的继承了这个默认方法，调用这些类型的实例的valueOf( )方法只是简答返回对象本身。日期类定义的valueOf( )方法会返回它的一个内部表示：1970年1月1日以来的毫秒数。

```javascript
[1,2].valueOf();  //=>  [1,2]  

(function (){}).valueOf();   //=>  function (){}

/\d/.valueOf();    //=>  /\d/  

new Date().valueOf();   //=>  1502941383029
```



原始值 不可变更的值 undefined null 布尔值 数字 字符串 

下面有一张javascript 权威指南的图

![border](https://segmentfault.com/img/remote/1460000011853914?w=643&h=510)



#### 对象到字符串的转换

1、如果对象具有toString( )方法，则调用这个方法。如果她返回一个原始值，JavaScript将这个值转换为字符串（如果本身不是字符串的话），并返回这个字符串结果。

  2、如果对象没有toString( )方法，或者这个方法并不返回一个原始值，那么JavaScript会调用valueOf( )方法。如果存在这个方法，则JavaScript调用它。如果返回值是原始值，JavaScript将这个值转换为字符串（如果本身不是字符串的话），并返回这个字符串结果。 

3、否则，JavaScript无法从toString()或者valueOf( )获得一个原始值，因此这时它将抛出一个类型错误异常。



#### 对象到数字的转换

1、如果对象具有valueOf( )方法，后者返回一个原始值，则JavaScript将这个原始值转换为数字（如果需要的话）并返回这个数字。  

2、否则，如果对象具有toString( )方法，后者返回一个原始值，则JavaScript将其转化并返回。  

3、否则，JavaScript抛出一个类型错误异常。



**所以这就解释了，为什么空数组会被转换为数字0，为什么具有单个元素的数组同样会转换成一个数字。**  数组继承了默认的valueOf( )方法，这个方法返回一个对象而不是一个原始值，因此，数组到数字的转换则调用toString( )方法。空数组转换为空字符串，空字符串转换为数字0。  含有一个元素的数组转换为字符串的结果和这个元素转换字符串的结果一样。 如果数组只包含一个数字元素，这个数字转换为字符串，在转换回数字。



```javascript
+[]; // 0
+['1'] // 1
+new Date(); // 时间戳数字形式
```



JavaScript中的"+"运算符可以进行数学加法和字符串连接操作。如果它的其中一个操作数是对象，则JavaScript将使用特殊的方法将对象转换为原始值，而不是使用其他算术运算符的方法执行对象到数字的转换，"= ="相等运算符与此类似。如果将对象和一个原始值比较，则转换将会遵照对象到原始值的转换方式进行。

"+" 和 "= ="应用的对象到原始值的转换包含日期对象的一种特殊情形。日期类是JavaScript语言核心中唯一的预先定义类型，它定义了有意义的向字符串和数字类型的转换。
对于所有非日期的对象来说，对象到原始值的转换基本上是对象到数字的转换（首先调用valueOf( )），日期对象则使用对象到字符串的转换模式，然而，这里的转换和上文讲述的并不完全一致：通过valueOf( )或者toString( )返回的原始值将被直接使用，而不会被强制转换为数字或字符串。

和"= ="一样，"<"运算符以及其他关系运算符也会做对象到原始值的转换，但要除去日期对象的特殊情形：任何对象都会首先尝试调用valueOf( )，然后调用toString( )。不管得到的原始值是否直接使用，它都不会进一步被转换为数字或字符串。