

### JavaScript打怪升级 把业务逻辑当练习



### 月份坐标轴

需求见下图

![border](http://mmbiz.qpic.cn/mmbiz_png/aVp1YC8UV0e19F13YpibqqgNPOiaCQBSNZ91PdWH5ric7ib49UUnHZrK3Cn4JXHiahft9P6z3zSnAPGe2vP5QOSjClw/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1)

![border](http://mmbiz.qpic.cn/mmbiz_png/aVp1YC8UV0e19F13YpibqqgNPOiaCQBSNZtooZZFVpy9ryiazdjTxWvvKoumcVSicVAuDMptjrqWhhhVxmF0usBDgw/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1)



实现一个 年月份下标的坐标轴。 唯一要注意的地方就是去年和今年都存在的情况

```javascript
var
	_date = [],
    dateData = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];

// 缓存一个反转的月份
var dateDataRet = Object.assign([], dateData).reserve();

// 获取年 月
const year = new Date().getFullYear();
const month = new Date().getFullMonth();

for (let i = 0; i < 6; i++) {
    if (month - i < 0) {
        _date.push(year - 1 + '年' + dateDataRet(Math.abs(month - i) - 1));
    } else {
        _date.push(year + '年' + dateData[month - i]);
    }
}

_date.reverse(); // 反转一下数组
```



### 学院获奖

统计学生申请优秀毕业生。并且符号条件的 。

![border](http://mmbiz.qpic.cn/mmbiz_png/aVp1YC8UV0e19F13YpibqqgNPOiaCQBSNZ4iajbJBABJ3MnUD6A1H1h2A9qicHB9Zvv8xgRjtv8F89qIBib8QZCyicPQ/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1)





#### 命名方式转换

驼峰命名方式 '-' 命名方式

```javascript
var str = 'backgroundColor';
str = str.replace(/([A-Z])/g, '-$1').toLowerCase();
// background-color

// 连字符转驼峰
str1 = str.replace(/-(\w)?/g, function(match, p1){
    return p1.toUpperCase();
});
```



#### 导入excel内容

例如：

![border](http://mmbiz.qpic.cn/mmbiz_png/aVp1YC8UV0e19F13YpibqqgNPOiaCQBSNZwX1GLsj0ms9VicqgZp3s2tkVZqeoaic2FzPBnloJm3IwDn2ib5I1VlQWA/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1)

新建一个文件 importjs。 

```javascript
const path = require('path');
const ejsExcel = require('ejsexcel');
const fs = require('fs');

// 读取excel
const exBuf = fs.readFileSync('./userList.xlsx');
let _data = [];
console.log(exBuf);

// 获取成功之后
ejsExcel.getExcelArr(exBuf).then(exlJson => {
	// 获取数据
	let workBook = exlJson;
	let workSheets = workBook[0];

	let newfilePath = path.join('./app/test.js');
	// 遍历第一张表的每一行数据
	workSheets.forEach((item, index) => {
		// 从第二行开始插入 避免连表头也插入_data 里面
		if (index > 0) {
			// 往_data 插入单元格个值 item[0]相当于excel中的姓名 item[1]就是excel中的联系电话
			_data.push({
				name: item[0],
				phone: item[1]
			});
		}
	});
	// 写入js文件
	fs.writeFileSync(newfilePath, 'let _data=' + JSON.stringify(_data) + ';export {_data}');
}).catch(error => {
	console.log(error);
});

```



##### 执行命令

node importJs.js

就会导出一个数组。





























