/**
 * 数组平铺内容 [1, [2, 3, [4, 5, 6]], [7, 8]] // 合并成一个数组
 */

var flattern1 = (array) => {
  return array.reduce((result, val) => {
    // 判断值是不数组 如果是 再次合并
    return result.concat(Array.isArray(val) ? falatt  : val);
  })
}


/**
 * 数组去重
 */

let unique = (array) => {
  return [...new Set(array)];
}

let unique = (array) => {
  return array.filter((val, index) => {
    return array.indexOf(val) === index;
  });
}


/**
 * 判断是否为document对象(isDocument)
 * 可以根据 nodeType 为9 或者 DOCUMENT_NODE
 */

function isDocument(obj){
  // 排除null
  return obj !== null && obj.nodeType === obj.DOCUMENT_NODE;
}

/**
 * 判断obj是否为类数组对象（ArrayLike）
 * 含有对象元素的数字索引以及length属性标志属性的个数
 */

function likeArray(obj) {
  // !!obj 过滤false null undefined '' 
  var length = !!obj && 'length' in obj && obj.length,

  // 获取obj的数据类型
    type = $.type(obj);
  // 不能是function类型 不能是window
  // 如果是array直接返回false
  return 'function' !== type && !isWindow(obj) && ('array' === type || length === 0 || 
  (typeof length === 'number' && length > 0 && (length - 1) in obj))
}

