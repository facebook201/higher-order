/**  第一题 在二维数组中查找指定的元素 
 *  在一个二维数组中，每一行都按照从左到右递增的顺序排序，每一列都按照从上到下递增的顺序排序。
 *  请完成一个函数，输入这样的一个二维数组和一个整数，判断数组中是否含有该整数
 *  矩阵阵是有序的，从左下角来看，向上数字递减，向右数字递增，
 *  因此从左下角开始查找，当要查找数字比左下角数字大时。右移
 *  要查找数字比左下角数字小时，上移
 **/

// target 目标元素 array 二维数组
function Find(target, array) {
    var found = false;
    // 数值检测 检测其是否存在
    if (array !== null && array.length > 0 && array[0].length > 0) {
        // 保存行列的变量
        var rows = array.length;
        var cloums = arr;
    }
}