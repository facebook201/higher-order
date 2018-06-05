经常开发中会遇到在数组中查找指定元素的需求



#### ES6 findIndex

ES6对数据新增了findIndex 方法 它会返回数组中满足提供的函数的**第一个元素的索引** 否则返回 -1 



```javascript
function isBigEnough(ele) {
    return ele >= 15;
}

var ret = [1, 22, 3, 44].findIndex(isBigEnough);

var objArr = [
 {id: 1, name: 'jian'},
 {id: 2, name: 'anan'},
 {id: 188, name: 'superman'}
];

var ret = objArr.findIndex((v) => {
	return v.id === 188;
});

console.log(ret); // 2 索引
```



#### 实现一个findIndex 

```javascript
function findInx(arr, callback, context) {
	var length = arr.length;
	for (var i = 0; i < length; i++) {
		if (callback.call(context, arr[i], i, arr) return i;
	}
	return -1;
}
```

findIndex 是正序查找 但正如indexOf 还有一个对应的lastIndexOf 方法 我们也想写一个倒序查找的findLastIndex 函数

```javascript
function findLastIndex(array, predicate, context) {
    var length = array.length;
    for(var i = 0, length = array.length; i >= 0; i--) {
        if (predicate.call(context, array[i], i, array)) return i;
    }
    return -1;
}
```



findIndex 和 findLastIndex有很多重复的部分  所以可以传个参数来区分是 倒序还是正序查找

```javascript
function createIndexFinder(dir) {
    return function(array, predicate, context) {

        var length = array.length;
        var index = dir > 0 ? 0 : length - 1;

        for (; index >= 0 && index < length; index += dir) {
            if (predicate.call(context, array[index], index, array)) return index;
        }

        return -1;
    }
}

var findIndex = createIndexFinder(1);
var findLastIndex = createIndexFinder(-1);
```



