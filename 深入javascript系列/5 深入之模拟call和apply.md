







##### call 和 apply

> call 在使用一个指定this值和若干个指定的参数值得前提下调用某个函数或方法

```javascript
var foo = {value: 1};
function bar() {
  console.log(this.value);
}
bar.call(foo); // 1
```



* 注意两点 call 改变了this的指向 指向到foo
* bar函数执行了



```javascript
// apply
Function.prototype.apply = function (context, arr) {
    var context = Object(context) || window;
    context.fn = this;

    var result;
    if (!arr) {
        result = context.fn();
    }
    else {
        var args = [];
        for (var i = 0, len = arr.length; i < len; i++) {
            args.push('arr[' + i + ']');
        }
        result = eval('context.fn(' + args + ')')
    }

    delete context.fn
    return result;
}

// call
Function.prototype.call2 = function (context) {
    var context = context || window;
    context.fn = this;

    var args = [];
    for(var i = 1, len = arguments.length; i < len; i++) {
        args.push('arguments[' + i + ']');
    }

    var result = eval('context.fn(' + args +')');

    delete context.fn
    return result;
}
```



##### bind 的实现

> bind() 方法会创建一个新函数。当这个新函数被调用时，bind() 的第一个参数将作为它运行时的 this，之后的一序列参数将会在传递的实参前传入作为它的参数。(来自于 MDN )

bind的有两个特点 

* 返回一个函数
* 可以传入参数

```Javascript
var foo = {value: 1};
function bar() {
    console.log(this.value);
}
var bindFoo = bar.bind(foo);
bindFoo(); // 1
```



第一步 完成bind功能

```javascript
Function.prototype.bind2 = function(context) {
    var self = this;
    return function() {
        return self.apply(context);
    }
}
```



第二步可以传参数

是否可以在bind的时候传参数 是否在执行返回bind函数的时候是否可以传参数。

```javascript
var foo = {
    value: 1
};

function bar(name, age) {
    console.log(this.value);
    console.log(name);
    console.log(age);

}

var bindFoo = bar.bind(foo, 'daisy');
bindFoo('18');
// 1
// daisy
// 18
```

可以看到函数需要传两个参数。 竟然还可以在bind的时候 只传一个 执行返回函数的时候再传一个！

```javascript
// 可以通过arguments来处理
Function.prototype.bind = function(ctx) {
    var args = Array.prototype.slice.call(arguments, 1);
    var self = this;
    return function() {
        return self.apply(ctx, args.concat(Array.prototype.slice.call(arguments)));
    }
}
```



#### 构造函数的情况

bind 返回的函数可以作为构造函数 但是this会失效 参数依然有效。举个例子

```javascript
var value = 2;

var foo = {
    value: 1
};

function bar(name, age) {
    this.habit = 'shopping';
    console.log(this.value);
    console.log(name);
    console.log(age);
}

bar.prototype.friend = 'kevin';

var bindFoo = bar.bind(foo, 'daisy');

var obj = new bindFoo('18');
// undefined
// daisy
// 18
console.log(obj.habit);
console.log(obj.friend);
// shopping
// kevin
```

尽管在全局和 foo 中都声明了 value 值，最后依然返回了 undefind，说明绑定的 this 失效了，如果大家了解 new 的模拟实现，就会知道这个时候的 this 已经指向了 obj。



**我们知道构造函数的this是指向构造函数的实例。所有我们先判断this是否是bind返回函数的实例**

```javascript
Function.prototype.bind = function(ctx) {
    var args = Array.prototype.slice.call(arguments, 1);
    var self = this;
    var fBound = function() {
        var bindArgs = Array.prototype.slice.call(arguments);
        return self.apply(this instanceof fBound ? this : ctx, args.concat(bindArgs));
    }
    // 修改返回函数的 prototype 为绑定函数的 prototype，实例就可以继承绑定函数的原型中的值
    // 父类型的实例赋给子类型的原型 实现继承 但是我们直接修改fBound.prototype的时候 会修改绑定函数的原型 所以我们可以使用空函数中转
    fBound.prototype = this.prototype;
    return fBound;
}
```



```javascript
Function.prototype.bind2 = function (context) {

    if (typeof this !== "function") {
      throw new Error("Function.prototype.bind - what is trying to be bound is not callable");
    }

    var self = this;
    var args = Array.prototype.slice.call(arguments, 1);

    var fNOP = function () {};

    var fBound = function () {
        var bindArgs = Array.prototype.slice.call(arguments);
        return self.apply(this instanceof fNOP ? this : context, args.concat(bindArgs));
    }

    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();
    return fBound;
}
```

