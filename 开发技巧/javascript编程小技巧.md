#### 1 逻辑或 || 

**短路原理**

* 只要 || 前面为false, 不管 || 后面是 true 还是 fasle。 都返回 || 后面的值
* 只要 || 前面是 true, 不管后面是 true 还是 false 否返回前面



* 只要 && 前面为真 无论后面true 还是 false 都返回后面的值
* 只要 && 前面是假 无论后面是true 还是 false 后返回前面的值



#### 2 判断
 js 牢记的6个假值 0、“”、null、undefined、NaN、false。


#### 3 if else 语句
有时候如果逻辑很复杂的话 if else 会很多 所有我们应该首先预先不要的写在最上面
```javascript

if (abc) {
  // function...
} else {
  return
}

// 下面这样就会好很多
if (!abc) return;
function(){
  // ...
}
```

