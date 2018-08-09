#### 认识 Flow

* 类型推断 通过上下文来推断出变量类型 根据这些推断来检查类型
* 类型注释 事先注释好我们期待的类型 



#### 类型推断

```javascript
/*@flow*/

function split(str) {
    return str.split(' ');
}
split(10);
```

上面会检查报错 因为函数期待参数是字符串 而我们输入了数字



#### 类型注释

```javascript
function add(x, y) {
    return x + y;
}
add('hello', 1);

// 添加注释之后
```

上面的代码不会报错 应该语法层面考虑 + 可以用在字符串上 也可以使用在数字上 



#### 数组

```javascript
/*@flow*/

var arr: Array<number> = [1, 2, 3];

// 传入的参数是数字 而不是字符串
arr.push('hello'); 
```



#### 对象或类

```javascript
/*@flow*/

class Bar {
  x: string;
  y: string | number;
  z: boolean;

  constructor(x: string, y: string | number) {
    this.x = x;
    this.y = y;
    this.z = false;
  }
}

var bar: Bar = new Bar('hello', 4);

var obj: {a: string, b: number, c: Array<string>, d: Bar } = {
  a: 'hello',
  b: 11,
  c: ['hello', 'world'],
  d: new Bar('hello', 3)
}
```



#### Null

若想任意类型T可以为null 或者undefined 只需要如下写成 ?T 的格式即可。

```javascript
/*@flow*/

var foo: ?string = null;
```



























