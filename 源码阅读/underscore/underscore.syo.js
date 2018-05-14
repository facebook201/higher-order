;(function(){
  // 基本配置

  // 将this赋值给局部变量root 客户端是window 服务端是global 
  var root = this;

  var count = 1;
  var container = document.getElementById('app');

  function getUserAction() {
    container.innerHTML = count++;
  }
  container.addEventListener('mousemove', debounce());
/**
  * 防抖实践
  * 思路：要有一个定时器 触发事件的时候记住时间 然后再n秒之内没有再次触发 就执行回调函数
  * 如果触发了那么久清除之前的时间 以新的时间为最新时间
  */
function debounce(func, wait) {
  var timer;
  return function() {
    clearTimeout(timer);
    timer = setTimeout(func, wait);
  }
}


}(this));
