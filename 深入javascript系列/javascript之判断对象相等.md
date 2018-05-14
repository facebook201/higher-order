### javascript 之数组去重



* indexOf 判断数组里面是否有这个元素 如果有就加入到数组中

  ```javascript
  function unique(arr) {
    var resultArr = [];
    for (var i = 0, len = arr.length; i < len; i++) {
      if (resultArr.indexOf(arr[i]) === -1) {
        resultArr.push[arr[i]];
      }
    }
    return resultArr;
  }
  ```

  ​

* 排序之后的去重 就只要判断两个相邻的元素 这种方法的效率比上面的indexOf肯定要高

  ```javascript
  var array = [1, 1, '1'];

  function unique(array) {
      var res = [];
      var sortedArray = array.concat().sort();
      var seen;
      for (var i = 0, len = sortedArray.length; i < len; i++) {
          // 如果是第一个元素或者相邻的元素不相同
          if (!i || seen !== sortedArray[i]) {
              res.push(sortedArray[i])
          }
          seen = sortedArray[i];
      }
      return res;
  }
  ```

  ​

* filter

  ```javascript
  var array = [1, 2, 1, 1, '1'];

  function unique(array) {
      var res = array.filter(function(item, index, array){
          return array.indexOf(item) === index;
      })
      return res;
  }

  // 排序之后的
  var array = [1, 2, 1, 1, '1'];

  function unique(array) {
      return array.concat().sort().filter(function(item, index, array){
          return !index || item !== array[index - 1]
      })
  }
  ```

  ​

* ES6的简化

  ```javascript
  function unique(array) {
     return Array.from(new Set(array));
  }

  function unique(array) {
      return [...new Set(array)];
  }
  ```

  ​

  ​




