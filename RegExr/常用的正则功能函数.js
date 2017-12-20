/**
 * 首字母大写
 */

String.prototype.firstUpperCase = function() {
    // 匹配开头 非空白的字符
    return this.replace(/^\S/, function(s) {
        return s.toUpperCase();
    });
}

/**
 * background-color 驼峰命名法
 */

function camelize(str) {
    return str.replace(/-(\w)?/g, function(match, chr) {
        return chr ? chr.toUpperCase() : '';
    });
}

/**
 * 获取url指定参数值
 * ["?name=lisi"]
 */

function getParamName(attr) {
    let match = RegExp(`[?&${attr}=(^&]*)`).exec(window.location.search); // 分组运算符把结果存在exec 函数返回的结果里

    // url中的+表示空格 要替换掉
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

// getParamName('name') list


