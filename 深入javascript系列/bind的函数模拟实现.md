#### bind

> bind方法会创建一个新函数。当这个新函数被调用时 bind() 的第一个参数将作为它运行时的this。之后的
>
> 一序列参数会在传递的实参前传入作为它的参数。

* bind 返回一个函数 称为 绑定函数
* 可以传入参数



```javascript
Function.prototype.bind = Function.prototype.bind || function(ctx) {
    var self = this;
    // 保存参数
    var args = Array.prototype.slice.call(arguments, 1);
    return function() {
        // 这个参数是 bind函数传入的参数
        var innerArgs = Array.prototype.slice.call(arguments);
        var finalArgs = args.concat(innerArgs);
        return self.apply(ctx, finalArgs);
    }
}
```



##### 构造函数效果的模拟实现

> bind函数的另一个特点。就是使用new操作符创建对象。 这种行为就像把原函数当成构造器。提供的this值
>
> 被忽略。同时调用时的参数被提供给模拟函数

也就是说 bind返回的函数作为构造函数时候 bind指定时的this值会失效。 但传入的参数依然生效。举个例子：

```javascript
        function bind(ctx) {
            var args = arrayPro.slice.call(arguments, 1);
            return function() {
                var innerArgs = arrayPro.slice.call(arguments);
                var finalArgs = args.concat(innerArgs);
                return ctx.apply(null, finalArgs);
            }
        }

        var value = 2;
        var foo = {
            value: 1
        };

        function bar(name, age) {
            this.habit = 'shopping';
            console.log(name, age, this.value);
        }

        var bindFoo = bar.bind(foo, 'syo');
        var obj = new bindFoo('18');
```

最后的value 返回的是undefined。 说明this失效了。此时这个this指向了obj。 **通过修改返回的函数的原型来实现**

```javascript
Function.prototype.bind = function(ctx) {
    var self = this;
    var args = ArrayPro.slice.call(arguments, 1);
    
    var fBound = function() {
        var bindArgs = ArrayPro.slice.call(arguments);
        // 作为构造函数是 this指向实例 结果是true 将绑定函数的this指向该实例 可以让实例获得
        // 来自绑定函数的值。上面的是demo为例。如果改成 `this instanceof fBound ? null : ctx` 
        // 实例只是一个空对象 将null改成this。实例会具有habit属性 当做普通函数时 this指向window 
        // 此时结果为false 将绑定函数的this指向ctx
		return self.apply(this instanceof fBound ? this : ctx, args.concat(bindArgs));
    }
    fBound.prototype = this.prototype;
    return fBound;
}
```



























