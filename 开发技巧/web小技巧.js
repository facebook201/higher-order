/**
 * 短信倒计时
 * @param { el } 短信按钮
 */

var awitTime = 60;

function setTime(el) {
    // 如果时间等于0 
    if (awitTime == 0) {
        el.removeAttribute('disabled');
        el.innerHTML = '重新获取';
        el.style.backgroundColor = '#44afdf';
        awitTime = 60;
    } else {
        el.setAttribute('disabled', true);
        el.innerHTML = awitTime + 'S';
        el.style.backgroundColor = '#ccc';
        awitTime--;
        timeId = setTimeout(function () {
            setTime(el);
        }, 1000);
    }
}

dom.addEventListener('click', function (eve) {
    if (1) {
        setTime(this);
    }
}, false);

/**
 * 参数过滤
 * 比如请求时候 过滤一些null undefined 值的参数
 */

function param(options) {
    const param = Object.assign({}, options);
    Object.keys(param).forEach((v, i) => {
        // 这里会过滤所有为假的值 如果有的参数要传0可以加
        // if（!param[v] && param[v] !== 0）
        if (!param[v]) {
            delete param[v];
        }
    });
    return param;
}

// 如果参数里面还有对象 
function filterParam(param) {
    const params = Object.assign({}, param);
    Object.keys(params).filter(v => {
        if (params[v] === '') {
            delete params[v]
        } else if (!params[v] === 'object') {
            // 递归将属性值为对象的值进行再次遍历监测 把过滤之后的值返回给当前属性
            params[v] = filterParam(params[v]);
        }
    });
    return params;
}

/**
 * 判断一个对象是否为空 对象是没有length属性的 但是我们可以遍历对象来判断是否有自有属性
 */

function isEmptyObj(obj) {
    for (var i in obj) {
        return true;
    }
    return false;
}


/**
 *   判断某个DOM 里面是否有这个class
 *  @param { el } dom元素
 *  @param { className } 要找的类名 className
 */

function hasClass(el, className) {
    var reg = new RegExp('(^|\\s)' + className + '(\\s|$)');
    return reg.test(el.className);
}

/**
 * 添加一个class 当然要首先判断里面是否有这个类名
 * @param { el } 添加的DOM
 * @param { className } 要添加的class
 */
function addClass(el, className) {
    if (hasClass(el, className)) {
        return;
    }
    let newClass = el.className.split(' ');
    newClass.push(className);
    el.className = newClass.join(' ');
}

/**
 * 大数据渲染
 * 两种方案 setTimeout定时器 createDocumentFragment
 */
// 第一种方案

var app = document.getElementById("app");

var j = 1;
/**
 * 渲染方式
 * 
 * @number {number} 数量
 * */
function showDom(number) {
    console.log('渲染' + (j++) + "次");
    for (var i = 0; i < number; i++) {
        var span = document.createElement("span");
        span.innerHTML = i;
        app.appendChild(span);//例子才会这样写的
		/**
    	*工作中会 这样写，拼接字符串，for循环结束后一次性appendChild
    	*/
    }
}
/**
 * 渲染大数据量的dom节点
 * 
 * @count {number} 总数量
 * 
 * */
function init(count) {
    if (typeof count !== "number") {
        console.warn(count + "类型不是：Number");
        return;
    }
    if (count > 500) {
        setTimeout(function () {
            showDom(500);
            init(count - 500);
        }, 200);
    } else {
        showDom(count);
    }
}

init(4000);

function showDom1(number) {

    for (var i = 0; i < number; i++) {
        var span = document.createElement("span");
        span.innerHTML = i;
        fragment.appendChild(span);
    }
    app.appendChild(fragment);
}
showDom1(10000);

