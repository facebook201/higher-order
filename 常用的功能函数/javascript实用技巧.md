### 1 深浅拷贝

* 深拷贝和浅拷贝只针对 Object、Array 这样的引用类型数据。
* 浅拷贝是拷贝对象的引用地址 没有开辟新的栈 也就是拷贝后的结果是两个对象指向同一个引用地址。修改其中一个对象的属性 另一个对象的属性也会改变
* 深拷贝会开启一个新的栈 两个对象对应两个不同的引用地址 修改一个对象的属性 不会改变另一个对象的属性


```javascript
// 利用递归实现 如果对象的属性是引用类型 则对该属性进行深拷贝
function deepClone(obj) {
  if (!obj && typeof obj !== 'object') {
    return;
  }
  var newObj = obj.constructor === Array ? [] : {};
  for (var key in obj) {
    if (obj[key] && obj.hasOwnProperty(key)) {
      newObj[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key];
    }
  }
  return newObj;
}

// 如果属性值没有函数 可以使用 JSON
var newObj = JSON.parse(JSON.stringify(obj));

```

### 2 使用对象作为函数参数

```javascript
function personInfo(name, phone, card) {
  //...
}

// 以上函数 可以任意传参数 这样写 很不优雅
personInfo('', '', '12131123');

// 如果是这样 就很好
function personInfo(opt) {
  // ...
}

personInfo({car: 'q23123'});

```
如果要新增参数 那么还要在后面加、很不方便。


### 3 toFixed保留整数

我们经常会遇到最多保留多位小数或者类似的问题。 使用toFixed可以简单解决这个问题。 如数据要跟后台交互
那么我们还要把数据转型。
```javascript
// 如果不加 + 那么就会转换为字符串 我们加个 + 就会变成Number
var a = 123.141212.toFixed('2');

a =+a; // 123.14

// | 0 和 ~~a 也可以实现。但是生成的是一个整数

a = a|0; // 123
a = ~~a; // 123

```





