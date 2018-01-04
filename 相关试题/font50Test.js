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