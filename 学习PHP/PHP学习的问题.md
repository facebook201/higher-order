>  PHP全局变量

```php
// 全局变量为什么不能在函数内部赋值
function destroy_fun() {
    global $foo = 'zhangsan';
    unset($foo);
    
    // unset($GLOBALS['foo']) 可销毁
}

destroy_fun();
echo $foo;
```

unset的几个问题

* unset用来销毁指定的变量 unset在函数中的行为会依赖于想要销毁的变量的类型而有所不同
* 如果在函数中 unset一个全局变量 则只是局部变量被销毁 在调用环境中还是保持之前的值
* 如果想要在函数中销毁全局变量 那么使用 $GLOBALs 数组实现
* 如果在函数中销毁一个通过引用传递的变量 则只是局部变量被销毁 



> PHP常量

