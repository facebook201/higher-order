#### this self parent 关键字

this 关键字 **代表着调用其自己所在的那个方法的对象本身。**

- this本身是一个“变量” 属于系统内部的特殊变量
- $this 这个词只能放在一个类中的一个方法中 通常都是实例方法中

```php
class A {
    var $p = 1;
    static $p2 = 2;
    function case_func() {
        echo $this->p;
        echo '<br />' . A::$p2;
    }

    static function static_func() {
        echo A::$p2;
        echo '<br />'. $this->p1;
    }
}
```

**实例方法中 使用静态属性是可以 但是静态方法中 使用实例属性就不行**





self 代表所在类的本身 只能写在一个类中 甚至是只能写在一个类的一个方法中。


self一般是常量或者静态变量
this是用在普通变量，public private protected

对比：

$this：

代表对象——调用其所在方法的对象；

通常，在实例方法中出现；

使用形式：$this->实例属性或实例方法()

self：

代表类——其本身所在的类

在静态方法或实例方法中都可以出现；

使用形式：self :: 静态属性或静态方法();

小总结：

$对象->实例属性；

$对象->实例方法；其中方法中可以出现：$this,self，

类名::静态属性；

类名::静态方法； 其中方法中可以出现：self，



> :: 类中 静态方法和静态属性的引用方法

**可以不用实例化对象直接使用Test::$test 或者 Test::testA()调用静态方法 **

```php
class Test {
    public static $test = 'static variable';
    public static function testA() {
        echo 'static method';
    }
}

echo Test::$test;   // static variable
echo Test::testA(); // static method
```

