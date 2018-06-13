#### 自动加载机制__ autoload

因为include 和 require 不能满足需求。所以自动加载机制发挥了

* include 和 require 功能是一样的，它们的不同在于 include 出错时只会产生警告，而 require 会抛出错误终止脚本。


* include_once 和 include 唯一的区别在于 include_once 会检查文件是否已经引入，如果是则不会重复引入。





#### 范围解析操作符  ::

范围解析操作符 :: 是一对冒号 可以用于访问 静态成员、方法和常量 以及被覆盖类中的成员和方法。

当在类的外部使用 :: 符合访问这些静态成员、方法和常量 必须使用类的名字 

```php
// 访问静态成员 方法的例子
class Person {
  public static $country = '中国';

  public static function myCountry() {
    echo self::$country;
  }
}

echo Person::$country;
Person::myCountry();
```



#### PHP重载

**PHP重载是指在子类里面定义一个和父类同名的方法 且该方法将在子类中把父类的方法覆盖**

因为从父类继承过来的方法可能无法访问子类定义的属性或方法 所以有时候重载是必要的

```php
<?php
class Person {
    var $name;
    var $age;

    function say() {
        echo "我的名字叫：".$this->name."<br />";
	echo "我的年龄是：".$this->age;
    }
}

// 类的继承
class Student extends Person {
    var $school;    //学生所在学校的属性
	
    function say() {
        echo "我的名字叫：".$this->name."<br />";
        echo "我的年龄是：".$this->age."<br />";
        echo "我正在".$this->school."学习";
    }	
}

$t1 = new Student();
$t1->name = "张三";
$t1->age = "18";
$t1->school = "人民大学";
$t1->say();
?>
```

如果父类定义方法时使用了final关键字 则不允许被子类方法覆盖



#### abstract 关键字用于定义抽象方法与抽象类

抽象方法时指没有方法体的方法；

**只要一个类里面有一个方法时抽象方法 那么这个类就是抽象类 抽象类不能产生实例对象 通常是将抽象方法作为子类方法重载的模板使用 抽象类是为了方便继承而引入的**

```php
abstract class Person {
  // 抽象方法
  abstract protected function getValue ();

  public function printOut() {
    print $this->getValue(). '<br/>';
  }
}

class ConcreteClass extends Person {
  protected function getValue() {
    return '抽象方法的实现';
  }
}

$class1 = new ConcreteClass();
$class1->printOut();
```



#### __ call __ toString

































