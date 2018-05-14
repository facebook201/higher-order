/* 1 手写一个 bind 函数 */
Function.prototype.bind = Function.prototype.bind || function(context) {
    var me = this;
    var args = Array.prototype.slice.call(arguments, 1);
    return function() {
        var innerArgs = Array.prototype.slice.call(arguments);
        var finalArgs = innerArgs.concat(args);
        return me.apply(context, finalArgs);
    }
}

/* 2 实现随机数字  */
var rand = (function() {
    var today = new Date();
    var seed = today.getTime();

    function rnd() {
        seed = (seed * 9301 + 49297) % 233280;
        return seed / (233280.0);
    };
    return function rand(number) {
        return Math.ceil(rnd(seed) * number);
    }
})();