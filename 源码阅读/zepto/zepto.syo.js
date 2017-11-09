/**
 * created by syo on 2017/11/01 
 */
;(function(global, factory){
  if (typeof define === 'function' && define.amd)
    define(function() {return factory(global)})
  else 
    factory(global);
}(this, function(window){
  // 定义Zepto构造函数 核心是一个闭包 加载之后立即执行。 然后暴露给全局zepto
  var Zepto = (function(){

    // 定义一些变量 方便使用和压缩
    // emptyArray 等于 Array.prototype 
    var undefined, key, $, classList, emptyArray = [],
        concat = emptyArray.concat,
        filter = emptyArray.filter,
        slice = emptyArray.slice,
        document = window.document,

        elementDisplay = {}, classCache = {},
        cssNumber = {'column-count': 1, 'columns': 1, 'font-weight': 1, 'line-height': 1, 'z-index': 1, 'zoom': 1 },
        fragmentRE = /^\s*<(\w+|!)[^>]*>/,
        singleTagRE = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
        tagExpanderRE = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,
        rootNodeRE = /^(?:body|html)$/i,
        capitalRE = /([A-Z])/g,

        
            // special attributes that should be get/set via method calls
            methodAttributes = ['val', 'css', 'html', 'text', 'data', 'width', 'height', 'offset'],

            adjacencyOperators = ['after', 'prepend', 'before', 'append'],
            table = document.createElement('table'),
            tableRow = document.createElement('tr'),
            containers = {
                'tr': document.createElement('tbody'),
                'tbody': table,
                'thead': table,
                'tfoot': table,
                'td': tableRow,
                'th': tableRow,
                '*': document.createElement('div')
            },
            readyRE = /complete|loaded|interactive/,

            // 开始结束匹配 大小写字母、数字、- 符号 *表示出现零次或多次 如果不写就是出现一次
            simpleSelectorRE = /^[\w-]*$/,
            class2type = {},
            toString = class2type.toString,
            zepto = {},
            camelize, uniq,
            tempParent = document.createElement('div'),
            propMap = {
                'tabindex': 'tabIndex',
                'readonly': 'readOnly',
                'for': 'htmlFor',
                'class': 'className',
                'maxlength': 'maxLength',
                'cellspacing': 'cellSpacing',
                'cellpadding': 'cellPadding',
                'rowspan': 'rowSpan',
                'colspan': 'colSpan',
                'usemap': 'useMap',
                'frameborder': 'frameBorder',
                'contenteditable': 'contentEditable'
            },
            // 如果不支持 isArray 就判断它是不是Array的实例
            isArray = Array.isArray || function(obj){ return obj instanceof Array};

            zepto.matches = function(element, selector) {

            }

           
            zepto.Z = function(dom, selector) {
              return new Z(dom, selector);
            }

            // 应该返回true 如果传的对象是一个zepto的集合。 
            zepto.isZ = function(obj) {
              return Object instanceof zepto.Z;
            }

            // 这个方法可以在插件中被重写
            zepto.init = function(selector, context) {
              var dom;
              // 如果是空 就返回空的Zepto集合 
              if (!selector) return zepto.Z();

              else if (typeof selector == 'string') {
                selector = selector.trim();
              }
            }

            // 245
            // $ 是基于 Zepto对象的。 当调用这个函数的是仅仅是调用了 zepto.init
            $ = function(selector, context) {
              // 自动调用初始化函数init
              return zepto.init(selector, context);
            }


            zepto.Z.prototype = Z.prototype = $.fn; 
            
            zepto.uniq = uniq;
            zepto.deserializeValue = deserializeValue;
            $.zepto = zepto;

            return $;
  })();
  // 暴露给全局的Zepto 如果$ 没有定义 就将zepto赋给$  所以在window下有Zepto 和 $
  window.Zepto = Zepto;
  window.$ === void 0 && (widow.$ = Zepto);
  






}));