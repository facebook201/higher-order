// stack

;(function($){

  $.fn.end = function() {
    return this.prevObject || $();
  };

  $.fn.adnSelf = function() {
    return this.add(this.prevObject || $());
  };

  'filter'

}(Zepto));
