#### 数据库 关系型数据库（RDBMS）

关系型数据库是建立在关系模型基础上的数据库。借助于集合代数等数学概念和方法来处理数据库中的数据。特点如下

* 1 数据以表格的形式出现
* 2 每行为各种记录名称
* 3 每列为记录名称所对应的数据域
* 4 许多的行和列组成一张表单
* 5 若干的表单组成database



#### RDBMS

* 数据库：数据库是一些关联表的集合
* 数据表：表是数据的矩阵 表有点像简单的电子表格
* 列：包含了相同的数据 例如邮政编码的数据
* 行：一组相关的数据 例如一条用户订阅的数据
* 冗余：存储两倍数据 降低了性能 但是提高了数据的安全性
* 主键：主键是唯一的 一个数据表里面只能有一个主键 使用主键查数据
* 外键：用来关联两个表
* 复合键：将多个列作为一个索引键 一般用于复合索引
* 索引：使用索引快速访问数据库表中的特定信息 索引是对数据库表中一列或多列的值进行排序的一种结构 类似于书籍的目录



#### 验证数据库的安装

通过mysqladmin 工具获取服务器状态 linux 位于 /usr/bin on linux。 window 位于 C:\mysql\bin

>mysqladmin --version
>
>```
>mysqladmin  Ver 8.23 Distrib 5.0.9-0, for redhat-linux-gnu on i386
>```



> mysql.server start
>
> 启动数据库



> 登录数据库
>
> mysql -u root -p -P
>
> -u 用户 -p 密码 -P 端口号



> 修改密码
>
> mysqladmin -u root password "new_password"



#### 查询数据

select _column from table limit N offset M

- select * : 返回所有记录
-  limit N : 返回 N 条记录
-  offset M : 跳过 M 条记录, 默认 M=0, 单独使用似乎不起作用
-  limit N,M : 相当于 **offset N limit M** , 从第 N 条记录开始, 返回 M 条记录

// 返回0到8之间的数据 类似分页

select * from myguests limit 8 offset 0; 

select * from myguests limit 0, 8;  



#### WHERE 子语句

SELECT field, filed1... FROM table_name [where condition1 [AND [OR]]] condition2...

WHERE子句类似于程序语言中的if条件

```mysql
SELECT * FROM myguests WHERE username='张三';
// WHERE 是不区分大小写的 可以使用关键字 BINARY 设定字符串区分大小写
```



#### UPDATE 查询 更新或修改数据

```mysql
UPDATE tablename SET field=new-value, field2=new-value2 [WHERE Clause]
// 更新语句 // 更新id为1的username
mysql> UPDATE myguests SET username="张三1" where id=1; 
```

update 表名称 set 列名称=新值 where 更新条件;



#### DELETE 语句 删除数据库中的表记录

```mysql
DELETE FROM table_name [WHERE Clause]
// 删除示例
delete from myguests where id=1;

delete from myguests where age < 3;
```

* 没有指定where会删除所有表数据
* 通过where指定



#### LIKE  来匹配含有字符的记录

```mysql
select field from table_name where fileds like condition1;

select * from myguests WHERE username like '%com'; // 以com结尾的username字段的记录 

// like 匹配/模糊匹配 % 和 _ 结合使用

'%a'     //以a结尾的数据
'a%'     //以a开头的数据
'%a%'    //含有a的数据
'_a_'    //三位且中间字母是a的
'_a'     //两位且结尾字母是a的
'a_'     //两位且开头字母是a的

```



#### UNION 操作符连接两个以上的结果组合到一个结果集合中

```mysql
SELECT expression, expression2, ... FROM tables [Where conditions] UNINON [ALL | DISTINCT] SELECT expression1 FROM tables [WHERE conditions]

```



演示 数据库

```mysql
mysql> SELECT * FROM Websites;
+----+--------------+---------------------------+-------+---------+
| id | name         | url                       | alexa | country |
+----+--------------+---------------------------+-------+---------+
| 1  | Google       | https://www.google.cm/    | 1     | USA     |
| 2  | 淘宝          | https://www.taobao.com/   | 13    | CN      |
| 3  | 菜鸟教程      | http://www.runoob.com/    | 4689  | CN      |
| 4  | 微博          | http://weibo.com/         | 20    | CN      |
| 5  | Facebook     | https://www.facebook.com/ | 3     | USA     |
| 7  | stackoverflow | http://stackoverflow.com/ |   0 | IND     |
+----+---------------+---------------------------+-------+---------+

// 
SELECT country FROM myguests UNION SELECT country FROM apps ORDER BY country
```



#### SQL UNION ALL 实例

取出表里面所有的country 也包括重复的值

```mysql
SELECT country FROM websites UNION ALL SELECT country FROM apps ORDER BY country;

// 
SELECT country, name FROM Websites
WHERE country='CN'
UNION ALL
SELECT country, app_name FROM apps
WHERE country='CN'
ORDER BY country;
```



#### MySQL 排序



```mysql
// select filed1, filed2 table_name ORDER BY field [ASC [DESC]] // 升序 降序
 
select * from myguests order by id ASC;
```



####  GROUP BY 

根据一个或多个列队结果进行分组 在分组的列上我们可以使用 COUNT SUM AVG 等函数

```mysql
select column_name function FROM table_name GROUP BY name;
```





#### JOIN 的应用

* INNER JOIN (内连接 等值连接)：获取两个表中字段匹配关系的记录
* LEFT JOIN 左连接：获取左表所有记录 即使右表没有对应匹配的记录
* RIGHT JOIN 右连接 与LEFT JOIN相反 用于获取右表所有记录 即使左表没有对应匹配的记录

MySQL left join 与 join 有所不同。 MySQL LEFT JOIN 会读取左边数据表的全部数据，即便右边表无对应数据



```mysql
select id from myguests inner join userinfo on id=uid;

```























































