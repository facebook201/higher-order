// 异步
// JavaScript的异步其实本质是还是同步。因为浏览器会有一个Event Queue 存放异步通知。
// JS在执行代码时候会产生一个执行栈。异步的Event Queue 中。只有当执行栈为空时。
// JS才会去Event Queue 中查看是否有需要处理的通知 有的话就拿到执行栈中执行。

function sleep(){
    var ms = 2000 + new Date().getTime();
    while (ms < new Date()) {}
    console.log('sleep finish');
}

document.addEventListener('click', function(){
    console.log('click');
}, false);

sleep();


// 闭包 和立即执行函数
// 闭包其实就是一个能够访问父函数局部变量的函数，父函数执行完之后。 内部的变量还存在内存上让闭包使用。
function a (name) {
    // 这就是一个闭包 在函数里面可以访问父函数的name局部变量 及时父函数执行完毕
    return function () {
        console.log(name);
    }
}
var b = a('js');
b(); // js
// 看一个例子
function egg() {
    var arr = [];
    for (var i = 0; i < 3; i++) {
        arr.push(
          function() {
              console.log(i);
          }
        )
    }
  return arr;
}
var b = a();
b[0](); // 3
b[1](); // 3
b[2](); // 3

// 这里push到数组的只是函数声明 并没有执行函数。所以在执行函数时 i变成了3; 所以要么使用let 生成块级作用域。要么就使用立即执行函数 保存当前i

arr.push(
  (function(j){
     return function() {
         console.log(j);
     }
  }(i))
)

// 从数组中查找某个值
const pets = {
  { type: 'Dog', name: 'Max' },
  { type: 'Cat', name: 'Karl' }
};

pet = pets.find(pet => pet.type === 'Dog' && pet.name === 'Max');

// Object[key]的简写
function validate(values) {
  if (!values.first)
    return false;
  if (!values.last)
    return false;
  return true;
}

const schema = {
  first: {
    required: true
  },
  last: {
    required: true
  }
};

// 验证函数
const validate = (schema, values) => {
  for (field in schema) {
    if (schema[field],required) {
      if (!values[field]) {
        return false;
      }
    }
  }
  return true;
}

console.log(validate(schema, {first:'Bruce'})); // false
console.log(validate(schema, {first:'Bruce',last:'Wayne'})); // true

// 双重位运算符简写
Math.floor(4.9) === 4; // true
~~4.9 = 4;

4.9 | 0; = 4






//
