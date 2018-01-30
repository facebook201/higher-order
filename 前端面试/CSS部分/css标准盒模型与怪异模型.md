#### 标准盒模型和怪异模型 + box-sizing

* 标准盒模型 width 和 height指的是 内容区域的宽度和高度。 增加内边距、边框、外边距不会影响内容区域的尺寸。 但是会增加元素框的总尺寸

* 怪异盒模型 IE

  IE盒子模型的content部分包含了border 和 padding 不包含 margin。

* box-sizing

  box-sizing 属性允许你以某种方式定义某些元素。如果你想设置两个带边框的框。可通过box-sizing: 'border-box';

  ​



### BFC

通过某些手段形成的一个独立渲染区域。只有block-level box参与。 并且里面怎么布局 跟外面的区域毫无干系。

规则：

* 内部box 一个个放置
* box垂直方向的距离由margin决定 属于同一个 BFC的两个相邻Box的margin会发生重叠。 包含块border box 的左边相接触 即使存在浮动也是一样。
* BFC不会与float box 重叠。
* 计算BFC高度的时候 浮动也参与计算



#### 哪些元素会生成 BFC?

* 根元素
* float 属性不为none
* display: inline-block table-cell flex inline-flex
* overflow不是visiable



#### BFC 作用以及原理

* 自适应两栏布局
* 清除内浮动
* 放置margin重叠

