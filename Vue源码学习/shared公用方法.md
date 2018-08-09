#### toArray 类数组转换为数组

```javascript
/**
 * list 类数组
 * start 转换数组的起始位置
 */
function toArray(list, start) {
	start = start || 0;
    let i = list.length - start;
    const ret = new Array(i);
    
    while(i--) {
        ret[i] = list[i + start];
    }
}
```





