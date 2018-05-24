#### 常量

* 常量一旦定义无法更改或撤销
* 常量不需要开头的$
* 与变量不同 常量贯穿整个脚本是自动全局的 作用域不影响对常量的访问
* 常量值只能是字符串或数字



#### 设置PHP常量

**define(name,value,boolean)** 

三个参数 常量名称  常量的值 是否对常量大小写敏感 默认false  -
=======
三个参数 常量名称  常量的值 是否对常量大小写敏感 默认false。（false 是敏感的 true不敏感 都可以）

使用constant() 函数。 它和直接使用常量名输出的效果是一样的 但函数可以动态的输出不同的常量 在使用上灵活方便



#### 判断一个常量是否定义 defined() 

```php
define('NAME', '自强不息');
echo NAME;

// 判断一个常量是否已经定义 defined()
define('PI', 3.14);
var_dump(defined('PI')); // bool(true)
```



#### PHP 中的常量分别为自定义常量和系统常量

* 自定义常量 

```php
define('ERR', 0, true);
echo constant('err'); // 0
```



#### 2 系统常量





#### 3 超级全局变量

* $GLOBALS 所有全局变量数组 
* $_SERVER 服务器环境变量数组
* $_GET 通过GET方法传递给脚本的变量数组
* $_POST 通过POST 方法传递给该脚本的变量数组
* $_COOKIE cookie变量数组
* $_FILES 与文件上传相关的变量数组
* $_ENV 环境变量数组
* $_REQUEST 所有用户输入的变量数组
* $_SESSION 会话变量数组



#### PHP变量的三种作用域

> global 

* 全局 函数外声明的变量拥有global作用域 只能在函数以外进行访问


> local 局部变量

* 函数内声明的变量拥有local作用域 只能在函数内访问
* 可以在不同的函数中创建名称相同的局部变量 因为局部变量只能被创建它的函数所识别
* 如果要在函数内部使用全局变量 可以在变量前加 global 关键字 或者使用 $GLOBALS[index]数组

```php
$a =  5;
$b = 6;

function inner() {
	global $b;

	echo $b;
	echo $GLOBALS['a'];
}

inner();
```



> static 静态作用域

* 函数执行后 会删除所有变量 不过static的静态局部变量不会被删除 
* 每当函数被调用 这个变量所存储的信息都是最后一次调用的所包含的信息

```php
function inner() {
	$a = 1;
	static $b = 2;
	echo '<br>' . $a++ . ' ';
	echo $b++;
}

inner(); // 1 2
inner(); // 1 3
inner(); // 1 4
```
