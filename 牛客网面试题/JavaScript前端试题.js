/**
 * css中经常有类似于background-color 这种连接符方式。 通过js设置的时候要转为驼峰。backgroundColor
 * 完成此功能。 以-为分隔符号 将第二个起的非空单词首字母转为大写
 */

function camelize(str) {
  // 判断传进来的字符串是不是空字符串
  if(!str) {
    throw new ReferenceError('str is a empty string, please check it before passing!');
  }

  // 返回转换后的字符串 -webkitBorderImage fontSize
  var result = str.replace(/\b-(\w)/g, function(match, p){
    return p.toUpperCase();
  });

  // 判断字符的第一个子字符是不是-
  if (result[0] !== '-') {
    return result;
  } else {
    return result.split('-')[1];
  }
}

camelize('-webkit-border-image');
camelize('font-size');  


/**
 * 统计字符串中每个字符出现的频率 返回一个Object value为出现频率
 * 例如 hello, 那么就会返回 {h: 1, e: 1, l: 2, o: 1}
 */

function count(str) {
  if (typeof str !== 'string') {
      try {
        throw new Type('str is not string!');            
      } catch(e) {
          // 此处的console 可以使用一些弹框的组件来显示错误消息 下面是一样
          console.log(e.message);
          return false;
      }
  }
  if (!str.length) {
      throw new Reference('str is a empty string!');
  }
  
  var arr = str.split('');
  
  var result = arr.reduce(function(res, ele){
      if (ele in res) {
          res[ele]++;
      } else {
          res[ele] = 1;
      }
      return res;
  }, {});
  return result;
}


/**
 * 数组去重 包括 NaN的去重 但是 {} 不去重 
 */
Array.prototype.uniq = function () {
  var newArr = [];  
  var flag = true;
  var len = this.length;

  for (var i = 0; i < len; i++) {
      if (newArr.indexOf(this[i]) == -1) {
          // 判断NaN
          if (this[i] != this[i]) {
              if (flag) {
                  flag = false;
                  newArr.push(this[i]);      
              }
          } else {
              newArr.push(this[i]);
          }
      }
  }
  return newArr;
}