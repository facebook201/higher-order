
#### 什么是 for...of 循环

for...of 语句创建一个循环来迭代可迭代的对象（包括Array、Map、Set、String、TypedArray、arguments 对象）上创建一个迭代循环。

```javascript

for (const val of iterable) {
  console.log(val); // 返回的是属性值 而不是属性
}

// egg1 迭代数组

let arr = [10, 20, 30];
for (const val of arr) {
  val; // 10 20 30
}

// 迭代字符串
let string = 'hello';

for (const val of string) {
  val; // 'h' 'e' 'l' 'l' 'o'
}

// 3 跌代 Map 
let iterable = new Map([['a', 1], ['b', 2], ['c', 3]]);

for (let entry of iterable) {
  enrty; // ['a', 1] ['b', 2] ['c', 3]
}

// 4 迭代Set

let iterable = new Set([1,2,3,1,3,2]);

for (let value of iterable) {
  console.log(value); // 1 2 3
}

// 迭代arguments对象
(function(){
  for (let vl of arguments) {
    console.log(vl); // 1 2 3
  }
}(1, 2, 3));

```
#### for in
for...in 循环只遍历可枚举属性。

```javascript
var obj = {a:1, b:2, c:3};
    
for (var prop in obj) {
  console.log("obj." + prop + " = " + obj[prop]);
}
```


#### 为什么要这样设计for of

之前用for in 来查找对象属性时遍历原型链上的所有属性。有必要过滤出那些不希望出现在循环体中的属性， 这可以通过 Object.prototype 原型上的 hasOwnProperty 函数来完成。 很多场合我们希望拿到 own properties。所以一般来说比较低效。所以我们一般使用 
Object.keys(obj).forEach(...) 来遍历所有的自有属性。 




#### 与 for in 的区别

* for...in 语句 以原始插入顺序迭代对象的可枚举 注意要原型链上的 hasOwnProperty
* for of  语句 遍历 可迭代对象定义要迭代的数据
* for in 遍历数组的返回的是属性（也就是索引 而 for of是属性值）
* for of IE不支持




