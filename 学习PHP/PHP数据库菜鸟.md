### 查询

```mssql
mysql> SELECT name FROM user; // 查询user表里面的name字段
```



### PHP链接MySQL

* MySQLi extension
* PDO 

```php
/**
 * 连接数据库
 * MySQLi 面向对象
 */
$servername = 'localhost';
$username = 'root';
$password = '246521';

$conn = new mysqli($servername, $username, $password);

if($conn->connect_error) {
    die('连接失败：'.$conn->connect_error);
}

// 创建数据库
$sql = "CREATE DATABASE myDB";

if ($conn->query($sql) === true) {
    echo '数据库创建成功';
} else {
    echo 'Error creating database: '.$conn->error;
}

$conn->close();

// PDO
$servername = 'localhost';
$username = 'root';
$password = '246521';

// 连接数据库
function connDatabase($servername, $username, $password) {
    try {
        $conn = new PDO("mysql:host=$servername", $username, $password);
        echo '连接成功1';
    } catch (PDOException $e) {
        echo $e->getMessage();
    }
}


connDatabase($servername, $username, $password);
```

### PHP创建MySQL表

创建表前 我们需要使用use myDB 来选择要操作的数据：

> use myDB

```php

$servername = 'localhost';
$username = 'root';
$password = '246521';
$dbname = 'demo';

// 连接数据库
function connDatabase($servername, $username, $password, $dbname) {
    try {
        $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
        $sql = "create table MyGuest (
              id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
              firstname VARCHAR(30) NOT NULL,
              lastname VARCHAR(30) NOT NULL,
              email VARCHAR(50),
              reg_date TIMESTAMP
            )";
        $conn->exec($sql);

    } catch (PDOException $e) {
        echo $e->getMessage();
    }
    $conn = null;
}

connDatabase($servername, $username, $password, $dbname);
```



#### 插入数据 INSERT INTO

* SQL查询语句必须使用引号
* 在SQL查询语句中的字符串值必须加引号
* 数值的值不需要引号
* NULL 值不需要引号



```php
try {
        $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
        $sql = "INSERT INTO MyGuest (firstname, lastname, email)
              VALUES ('john', 'doe', 'jogn@example.com')";

        // 执行sql语剧 返回受影响的行数
        $line = $conn->exec($sql);
        echo $line;
    } catch (PDOException $e) {
        echo $sql . "<br>" . $e->getMessage();
    }
    $conn = null;
```



#### 插入多条数据

```php

$servername = "localhost";
$username = "root";
$password = "246521";
$dbname = "demo";
 
try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
 
    // 开始事务
    $conn->beginTransaction();
    // SQL 语句
    $conn->exec("INSERT INTO myguests (username, email) 
    VALUES ('John', 'john@example.com')");
    $conn->exec("INSERT INTO MyGuests (username, email) 
    VALUES ('斯里斯', 'mary@example.com')");
    $conn->exec("INSERT INTO myguests (username, email) 
    VALUES ('Julie', 'julie@example.com')");
 
    // 提交事务
    $conn->commit();
    echo "新记录插入成功";
}
catch(PDOException $e)
{
    // 如果执行失败回滚
    $conn->rollback();
    echo $sql . "<br>" . $e->getMessage();
}
 
$conn = null;
```



#### 预处理语句及绑定参数

* 预处理：创建SQL语句模板并发送到数据库 预留的值使用参数 ？标记

  ```php
  INSERT INTO MyGuests (firstname, lastname, email) VALUES(?, ?, ?);
  ```

* 数据库解析 编译 对SQL语句模板执行查询优化 存储结果不输出

* 执行 将应用绑定的值传递给参数 数据库执行语句 应用可以多次执行语句 如果参数的值不一样 相比于直接执行SQL语句 预处理语句有两个主要优点

  * 减少了分析时间 只做了一次查询
  * 绑定参数减少了服务器带宽 你只需要发送查询的参数 而不是整个语句
  * 预处理语句针对SQL注入非常有用 因为参数值发送后使用不同的协议 保证了数据的合法性



















































































