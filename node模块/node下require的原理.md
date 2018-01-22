Nodejs 所有的模块都是CommonJs格式。 它的模块仓库绝大多数都是CommonJS格式。 这种格式的核心就是**require语句。模块通过它加载。** 接下来我们看看require的内部运行机制

```javascript
// modelue b
var moduleA = require('Module_A');

moduleA.doSomething();

// 模块_A
export const do_nothing = (params) => // do something

```

 当Node遇到require(X)时。按照下面的顺序处理

* 如果X是内置模块 比如(require('http'))
  * 返回该模块
  * 不再继续执行
* 如果X以 './' 或者其他'/' '../'
  * 根据X所在的父模块 确定X的绝对路径
  * 将X当成文件 依次查找下面文件 只要其中有一个存在 就返回
* 如果X不带路径
  * 根据X所在的父模块 确定X可能的安装目录
  * 依次在每个目录中将X 当成文件名或目录名加载
* 抛出not found



### Module构造函数

require 函数在Node 的 lib/module.js 里

```javascript
function Module(id, parent) {
  this.id = id; // 是一个点
  this.exports = {};
  this.parent = parent; // 父模块
  this.filename = null; // 路径
  this.loaded = false;
  this.children = [];
}

module.exports = Module;

var module = new Module(filename, parent);
```

Node 定义了一个构造函数Module。 所有的模块都是Module的实例。 当前模块也是Module的一个实例。





### 模块实例的require方法

每个模块实例都有一个require方法

```javascript
Module.prototype.require = function(path) {
  asset(path, 'missing path');
  asset(typeof path === 'string', 'path must be a string');
  return Module._load(path, this, false);
}
```

由此可知道 require是每个模块提供的一个内部方法。 也就是 只有在模块内部才能使用require命令。require其实内部调用Module._load方法。



node根据传入的名称来定位文件

>1 先从缓存中读取 如果没有则继续往下
>
>2 判断 需要模块路径是否/结尾 如果不是 则要判断 
>
> a 检查是否是一个文件 如果是则转换为真实路径
>
> b 否则如果是一个目录 则调用tryPackage方法读取目录下的package.json 文件 把里面的main属性设置为filename



exports 其实是module的属性。 require是Module原型方法。 exports.xx = xx; 其实是跟mudule.exports.xx == xx; 其实是一样的。不过如果直接为export赋值 则不能写成exports = xx; 而应该写成module.exports = xx; 