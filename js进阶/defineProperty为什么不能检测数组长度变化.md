#### 属性类型

对象是一个无序属性集合 创建一个包含属性的对象有3种方式

* 构造函数
* 字面量
* defineProperty

```javascript
var obj1 = new Object();
obj1.name = 'a';

var obj2 = {};
obj2.name = 'b';

var obj3 = {};
Object.defineProperty(obj3, 'name', {
   enumerable: true,
   configurable: true,
    get() {
        return 'c'
    },
    set() {
        // do
    }
});
```



**属性类型分为 数据属性 和 访问器属性**

> ECMA规范中定义放在[[ ]] 中的属性表示内部属性

相同点 

* [[Configurable]] 字面理解是表示属性是否可配置——  能否修改属性 能否通过delete删除属性
* [[ Enumerable ]] 能否通过for in 循环该属性。



区别

* 数据属性

  * [[ Writable ]] 是否可写
  * [[ Value ]] 属性的值

* 访问器属性

  * [[Get]]取值函数
  * [[Set]]赋值函数

  

```javascript
// 假设我们想修改a的值为123
var object = { a: 1 }
Object.defineProperty(object, 'a', {
  enumerable: true,
  configurable: true,
  get() {
    // 不能在函数中引用属性a，否则会造成循环引用
    // 错误
    return this.a + '23'
    // 正确
    return val + '23'
  },
  set(newVal) {
    // 为了在原属性值的基础上修改属性，我们可以利用闭包的特性
    // 在初始化对象的时候会调用set函数，此时将属性（例如a）的值用闭包保存起来
    // 接着取值的时候，就利用闭包中变量的值修改即可
    val = newVal
  }
})
```



#### 数组长度与索引

我们知道vue对于监测数组的变化重写了数组的原型达到目的。 原因是defineProperty 不能检测到数组长度的变化。 改变length而增加的长度不能监测到。

**数组的长度和数组索引** 数组的length初始化时候

```javascript
enumberable: false
configurable: false
writable: true
```

**因为初始化的时候length属性被设置为无法修改的属性**

```javascript
var arr = [1, 2, 3];
console.log(Object.getOwnPropertyDescriptor(arr, 'length'));

Object.defineProperty(arr, 'length', {
	set(){}
});
// Uncaught TypeError: Cannot redefine property: length

var a = [a, b, c]
a.length = 10
// 只是显示的给length赋值，索引3-9的对应的value也会赋值undefined
// 但是索引3-9的key都是没有值的
// 我们可以用for-in打印，只会打印0,1,2
for (var key in a) {
  console.log(key) // 0,1,2
}

```

数组索引是访问数组值的一种方式，如果拿它和对象来比较，索引就是数组的属性key，它与length是2个不同的概念。

这几个内置的方法在操作数组时，都会改变length的值，分2种情况

减少值

​	当我们unshift一个数组时，你会发现它会遍历数组（下面有代码印证），此时数组的索引对应的值得到了相应的更新，这种情况下defineProperty是可以监测到的，因为有属性（索引）存在。


增加值

​	push值时，此时数组的长度会+1，索引也会+1，但是此时的索引是新增的，虽然defineProperty不能监测到新增的属性，但是在vue中，新增的对象属性可以显示的调用vm.$set来添加监听
手动赋值length为一个更大的值，此时长度会更新，但是对应的索引不会被赋值，也就是对象的属性没有，defineProperty再牛逼也没办法处理对未知属性的监听。



**对于defineProperty来说，处理数组与对象是一视同仁的，只是在初始化时去改写`get`和`set`达到监测数组或对象的变化，对于新增的属性，需要手动再初始化。对于数组来说，只不过特别了点，push、unshift值也会新增索引，对于新增的索引也是可以添加observe从而达到监听的效果；pop、shift值会删除更新索引，也会触发defineProperty的get和set。对于重新赋值length的数组，不会新增索引，因为不清楚新增的索引有多少，根据`ecma`规范定义，索引的最大值为`2^32 - 1`，不可能循环去赋值索引的**



#### Vue 对数组方法的hack

```javascript
if (Array.isArray(value)) {
    const arguments = hasProto ? protoArgument : copyAugment;
// 判断数组实例是否有__proto__属性，有就用protoAugment
  // 而protoAugment司机就是重写实例的__proto__
  // target.__proto__ = src
  // 将新的arrayMethods重写到value上
  augment(value, arrayMethods, arrayKeys)
  // 然后初始化observe已存在索引的值
  this.observeArray(value)
} else {
  this.walk(value)
}

```

在 array.js 里面重写了arrayMethods

```javascript
const arrayProto = Array.prototype;
// 复制了数组构造函数的原型
// 这里需要注意的是数组构造函数的原型也是个数组
// 实例中指向原型的指针__proto__也是个数组
// 数组并没有索引，因为length = 0
// 相反的拥有属性，属性名为数组方法，值为对应的函数
export const arrayMethods = Object.create(arrayProto)

// 对以下方法重写
const methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];
```

数组的构造函数的原型也是数组 但是默认给你内置几个方法。那么为什么只对这些方法重写呢？

```javascript
methodsToPatch.forEach(function (method) {
  // cache original method
  const original = arrayProto[method]
  // 这里的def很重要，其实也就是用object.defineProperty重新定义属性
  // 但这里的arrayMethods是个数组，这就是为什么上面我们解释
  // 数组构造函数原型是个空数组但是默认了属性方法
  // 所以这里的定义是很巧妙的
  def(arrayMethods, method, function mutator (...args) {
    const result = original.apply(this, args)
    // ob就是observe实例
    const ob = this.__ob__
    let inserted
    switch (method) {
      // 为什么对push和unshift单独处理？
      // 我们在上看解释过，这2中方法会增加数组的索引，但是新增的索引位需要手动observe的
      case 'push':
      case 'unshift':
        inserted = args
        break
      // 同理，splice的第三个参数，为新增的值，也需要手动observe
      case 'splice':
        inserted = args.slice(2)
        break
    }
    // 其余的方法都是在原有的索引上更新，初始化的时候已经observe过了
    if (inserted) ob.observeArray(inserted)
    // notify change
    // 然后通知所有的订阅者触发回调
    ob.dep.notify()
    return result
  })
})
```



#### Vue数组无法被检测变动

由于javascript的限制 Vue不能检测以下变动的数组

利用索引直接设置一个项的时候 vm.items[indexOfItem] = newValue;

修改

