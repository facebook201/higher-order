

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

