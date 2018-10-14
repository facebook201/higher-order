// Zepto.js 
// 11/10/2018 sy

var Zepto = (function(){
  var undefined, $,

  fragmentRE = /^\s*<(\w+|!)[^>]*>/, // 匹配 <a></a>
  zepto = {};


  function Z(doms) {
    var i, len = doms ? doms.length : 0;
    for (var i = 0; i < len; i++) this[i] = doms[i];
    this.length = len;
    this.selector = selector || '';
    // 返回一个对象 length: 0, selector: ''
  }

  zepto.Z = function(doms) {
    return new Z(doms);
  }

  zepto.isZ = function(object) {
    return object instanceof zepto.Z;
  };

  // $('#app') // 初始化执行的函数
  $ = function(selector, context) {
    return zepto.init(selector, context);
  };

  zepto.init = function(selector, context) {
    var dom;
    if (!selector) return zepto.Z();
    // 如果传了selector 优化字符串 去除两边的空白字符
    else if (typeof selector == 'string') {
      selector = selector.trim();
      
      if (selector[0] == '<' && fragmentRE.test(selector)) {
        dom = zepto.fragment(selector, RegExp.$1, context),
        selector = null;
      } else if (context !== undefined) {
        return $(context).find(selector);
      } else {
        dom = zepto.qsa(document, selector);
      }
    } else if (isFunction(selector)) {
      return $(document).ready(selector);
    } else if (zepto.isZ(selector)) {
      return selector;
    }
    return zepto.Z(dom, selector);
  };

  zepto.Z.prototype = Z.prototype = $.fn;

  zepto.uniq = uniq;
  zepto.deserializeValue = deserializeValue;
  $.zepto = zepto;

  return $;
}());

window.Zepto = Zepto;

window.$ === undefined && (window.$ === Zepto);