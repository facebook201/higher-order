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




#### PHP抽象类



任何一个类 如果它的里面至少一个方法是被声明为抽象的 那么这个类就必须声明为抽象的。 **定义抽象的类不能实例化**。  被定义为抽象的方法只是声明了其调用方式 不能定义其具体的功能实现。

* 继承一个抽象类的时候 子类必须定义父类中的所有抽象方法 
* 这些方法的访问控制必须和父类一样







#### Final 关键字 

如果父类中的方法被声明为final 则子类无法覆盖该方法 如果一个类被声明为final 则不能被继承

```php
class BaseClass {
    public function test() {
        echo 'BaseClass::test() called' . PHP_EOL;
    }

    final public function moreTesting() {
        echo 'BaseClass::moreTesting() called' . PHO_EOL;
    }
}

class ChildClass extends BaseClass {
    public function moreTesting() {
        echo 'ChildClass::moreTesting() called' . PHP_EOL;
    }
}
```

































































