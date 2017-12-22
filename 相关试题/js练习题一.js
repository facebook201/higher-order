/**
 * 找出数组中重复出现的元素 返回一个数组
 * 输入: [1, 2, 4, 1, 5, 2, 3, 5, 6]
 * 输出: [1, 2, 5]
 */

function duplicates(arr) {
  // 判断参数是否为数组
  if (!(arr instanceof Array)) {
    try {
      throw new TypeError('arr is not array');
    } catch(e) {
      console.log(e.message);
    }
  }

  // 先排一下传进来的数组
  arr = arr.sort();
  var newArr = [];

  arr.forEach(function(ele, index, array) {
    // 筛选出重复的元素
    if (array.indexOf(ele) !== index) {
      // 看看重复的元素是否添加到数组中 如果没有添加就添加进去 
      if (newArr.indexOf(ele) === -1) {
        newArr.push(ele);
      }
    }
  });

  // 将最后得到的数组排序
  return newArr.sort();
}