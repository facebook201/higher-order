/** 
 * new 一个类的时候 发生了什么
 */

function new(func) {
    // 创建一个实例对象o 并且这个对象 __proto__ 指向func这个类的原型对象
    let o = Object.create(func.prototype);
    // 在构造函数中this指向当前实例 让这个类作为普通函数执行 并且里面this为实例对象
    let k = func.call(o);
    // 最后将实例对象返回 如果你在类中显示指定返回值k
    return typeof k === 'object' ? k : o;
}

// 被new的类
function Fun() {
    this.name = 'lisi';
}

let m = new(FUN); // 等价于new Fun()
console.log(m instanceof Object);
console.log(m.__proto__.constructor === M);

/** 
 * 函数柯里化
 */
function curry(fn) {
    var args = Array.prototype.slice.call(arguments, 1);
    return function() {
        // 内部函数的参数
        var innerArgs = [].slice.call(arguments);
        // 合并成一个数组
        var finnalArgs = args.concat(innerArgs);
        return fn.apply(null, finnalArgs);
    }
}

function add(num1, num2) {
    return num1 + num2;
}

curry(add, 10, 20); // 30

// 第二种 几个参数 几个function()
function curry(fn) {
    // 参数的长度
    var args = [];
    var len = fn.length; // 3
    return function fe() {
        args = args.concat([].slice.call(arguments, 0));
        if (len === args.length) {
            return fn.apply(null, args);
        }
        return fe;
    }
}

function add(a, b, c) {
    return a + b + c;
}
console.log(curry(add)(1)(2)(3));


// 函数节流
let throttle = (fn, delay = 50) => {
    // 节流 控制执行时间间隔 防止频繁触发 scroll resize mousemove
    // 让频繁触发的函数 在固定时间内执行一次
    let startTime = 0;
    return function(...args) {
        let curTime = new Date();
        if (curTime - startTime >= delay) {
            fn.apply(this, args);
            startTime = curTime;
        }
    }
}

/** 
 * debounce 策略的电梯。如果电梯里有人进来 等待50毫秒 如果又有人进来 50毫秒等待 重新计时间 直到50毫秒超时 开始运送
 */
let debounce = (fn, delay = 50) => {
    // 定一个 timer 
    let timer;
    return function(...args) {
        let that = this;
        clearTimeout(timer);
        timer = setTimeout(fn.bind(that, ...args), delay);
    }
}

// 深拷贝的兼容写法
function deepCopy(obj) {
    if (typeof obj !== 'object') return obj;
    if (typeof window !== 'undefined' && window.JSON) {
        // 浏览器环境下 并支持window.JSON 
        return JSON.parse(JSON.stringify(obj));
    } else {
        let newObj = obj.constructor === 'Array' ? [] : {};
        for (var key in newObj) {
            newObj[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key];
        }
        return newObj;
    }
}


/** 
 * 找出重复出现在数组里面的元素 
 */
function repeat(arr) {
    var result = [];
    arr.reduce((all, ele) => {
        if (all.indexOf(ele) !== -1) {
            all.push(ele);
        } else {
            result.push(ele);
        }
    }, []);
    return result;
}