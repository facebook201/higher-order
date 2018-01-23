/**  第一题 在二维数组中查找指定的元素 
 *  在一个二维数组中，每一行都按照从左到右递增的顺序排序，每一列都按照从上到下递增的顺序排序。
 *  请完成一个函数，输入这样的一个二维数组和一个整数，判断数组中是否含有该整数
 *  矩阵阵是有序的，从左下角来看，向上数字递减，向右数字递增，
 *  因此从左下角开始查找，当要查找数字比左下角数字大时。右移
 *  要查找数字比左下角数字小时，上移
 **/



/**
 *  矩阵有序的 而且二维数组元素个数相等。根据规律右上角或者左下角的元素 arr[row][col] 进行比较
 *  当taregt 小于arr[row][col]时，target必定在元素的左边 col--;
 *  当target 大于元素arr[row][col]。target 必定在元素数组列的下班 row++
 **/

function Find(target, array) {
    // 首先设置一个变量从0开始
    var row = 0;
    var col = 0;
    // 如果是海量的元素 可以使用二分查找来找元素
    var mid = 0;
    // 类型监测
    if (array !== null && array.length > 0 && array[0].length > 0) {
    	// 循环每个区间的值
    	while (row < array.length - 1 && col >= 0) {
            // 这里是考虑到二维数组不是一个长度相等的元素 每次都赋值
            col = array[row].length - 1;
            if (target === array[row][col]) {
                return true;
            } else if (target > array[row][col]) {
                row++;
            } else {
                col--;
            }
    	}
    }
    return false;
}
