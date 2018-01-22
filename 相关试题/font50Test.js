/**
 * 计算给定数组中所有的元素求和
 * 使用reduce计算 返回函数累计处理的结果
 */
function sum(arr) {
    if (!arr.length) {
        return 0;
    }
    var result = arr.reduce(function(sum, val) {
        return sum + val;
    });
    return result;
}


/**
 * 移除数组中的所有值与item相等的元素 直接在数组上进行操作(这种就splice 如果不要在数组上操作就使用filter 返回一个新数组)
 */

// 第一种 顺序
function removeWithoutCopy(arr, item) {
    if (!arr.length) {
        return [];
    }
    for (var i = 0, len = arr.length; i < len; i++) {
        if (arr[i] === item) {
            arr.splice(i, 1);
            // splice 会删除一个元素 导致被删除那个元素的下一个会忽略
            i--;
        }
    }
    return arr;
}

// 第二种 从末尾删除 就不要考虑索引
function removeWithoutCopy(arr, item) {
    if (!arr.length) {
        return [];
    }
    for (var i = arr.length - 1; i > 0; i--) {
        if (arr[i] === item) {
            arr.splice(i, 1);
            // splice 会删除一个元素 导致被删除那个元素的下一个会忽略
        }
    }
    return arr;
}

/**
 * 在数组的index处添加元素 item 不要直接修改arr 返回新数组
 * 第一反应是 splice 可以设置 splice(index, 0, item); 这样可以加入元素 但是他会改变原数组
 * splice的返回值 由被删除的元素组成的数组 如果删除0个 则 返回一个空数组
 * 上面这个题 可以首先使用slice(浅拷贝)复制出一个数组 在这个数组上面操作
 */

function insert(arr, item, index) {
    var res = arr.slice(0); // 拷贝一份
    res.splice(index, 0, item);
    return res;
}

/**
 * 统计某个item出现在数组中的次数
 * 明显要循环这个数组 这里写两中方法
 */
function count(arr, item) {
  var count = 0;
  arr.forEach(v => {
    if (v == item) {
      count++;
    }
  });
  return count;
}

// 第二种 返回重复元素的数组的长度
function count2(arr, item) {
  return arr.filter(v => {
    return v == item;
  }).length;
}

/**
 * 找出数组 arr 中重复出现过的元素
 * 输入 [1, 2, 4, 4, 3, 3, 1, 5, 3]
 * 输出 [1, 3, 4]
 */

function duplicates(arr, item) {
  // 首先排序 把相同的排到一起 然后对比相邻的袁术是否相等 然后存到一个新
  // 的数组里面 并且判断一些是否存在 这样其实也就是去重
  // 这里的arr检测和数组的长度就不做了
  arr = arr.sort();
  var b = [];
  arr.forEach((v, i) => {
    if (arr[i] === arr[i - 1] && b.indexOf(arr[i]) == -1) {
      b.push(arr[i]);
    }
  });
  return b;
}

/**
 * 检查重复的字符串
 * 检查其是否包含连续重复的字母 (a-zA-Z) 包含就返回true
 **/

// 利用()进行分组 使用斜杠加数字表示引用。
function containsRepeatingLetter(str) {
  return /([a-zA-Z])\1/.test(str);
}

// 检查字符是否以a e i o u 结尾 包括大写字母
// 确定匹配的集合 然后加上i通配大小写
function endsWidthVowel(str){
  return /[a,e.i,0,u]$/i.test(str);
}


// 正则 给定字符串str。 检查是否包含连续3个数字
// 如果包含就返回最新出现的3个数字的字符串
// 如果不包含 返回false macth是检索匹配项
// 如果有匹配项就返回数组 数组的每个元素对应分组项

function captureThreeNumbers(str) {
  var reg = str.match(/(\d{3})/g);
  if (reg) {
    return reg[0] | 0;
  } else {
    return false;
  }
}

// 给定字符串 str，检查其是否符合美元书写格式
// 1、以 $ 开始
// 2、整数部分，从个位起，满 3 个数字用 , 分隔
// 3、如果为小数，则小数部分长度为 2
// 4、正确的格式如：$1,023,032.03 或者 $2.03，错误的格式如：$3,432,12.12 或者 $34,344.3

function isUSD(str) {
  return /^\$([1-9]\d{0,2}(,\d{3})*|0)(\.\d{2})?$/;
}
