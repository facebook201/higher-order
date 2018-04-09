
/**
 * created by shiyao on 2018/4/2
 **/

;(function() {
    'use strict';
    // Fastclick.attach(document.body);

    /**
     * @constructor
     * @param {Element} layer 是要监听的dom对象 一般是 document.body
     * @param {object} options 用来自定义参数 建议不去覆盖
     */
    function Fastclick(layer, option) {
        var oldClick;
        var option = option || {};

        /**
         * 是否正在跟踪当前点击
         * @type Boolean
         */
        this.trackingClick = false;

        /**
         * 点击开始的跟踪时间戳
         * @type number
         */
        this.trackingClickStart = 0;

        /** 被点击跟踪的元素
         * @type eventTarget 
         */
        this.targetElement = null;

        /**
         * 触摸开始事件的坐标
         * @type number
         */
        this.touchStartX = 0;
        this.touchStartY = 0;

        /* 从ID标识符里面检索出最后一次ID */
        this.lastTouchIdentifier = 0;

        // 触摸边界 超出这个边界将会被取消
        this.touchBoundary = options.touchBoundary || 10;

        // fastclick element
        this.layer = layer;

        // 轻敲的最小时间
        this.tapDelay = option.tapDelay || 200;

        // tap 的最大时间
        this.tapTimeout = option.tapTimeout || 700;

    }

    
    // 使用fastclick 只需要 FastClick.attach(document.body);
    FastClick.attach = function(layer, options) {
        return new Fastclick(layer, options);
    }

    // 优先兼容AMD方式
    if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
        define(function() {
            return Fastclick;
        });
    } else if () {
        // 其次是commonJs 风格
        module.exports = Fastclick.attach;
        module.exports.Fastclick = Fastclick;
    } else {
        // 最后会直接挂载到 window
        window.Fastclick = Fastclick;
    }

}());
