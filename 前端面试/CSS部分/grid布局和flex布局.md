### grid 相关应用

grid个人看起来比较繁琐 名字且长。没有flex好懂。 下面是几个常用的布局案例。

* 水平居中

  ```vue
  <template>
    <div class="box">
      <div class="content">我是子元素 我要垂直居中</div>
    </div>
  </template>

  <style>
    .box{
      display: grid;
      align-items: center;
      justify-items: center;
      height: 500px;
      width: 500px;
      background-color: green;
    }
    .content {
  	width: 200px;
  	height: 200px;
  	background-color: yellow;
  	line-height: 200px;
  	text-align: center;
    }
  </style>	
  ```

  ​

* 两栏/三栏布局 

  ```vue
  <template>
    <div class="box box1">
        <div class="left">left</div>
        <div class="main">main</div>
    </div>
  </template>

  <style>
  	.box {
  	display: grid;
  	height: 400px;
  	margin-bottom: 30px;
      /* 表示两栏 左边是200px */
  	grid-template-columns: 200px auto;
      /* 如果是三栏布局 */
      grid-template-columns: 200px auto 100px;  
  }
  .box1 {
  	grid-template-columns: 200px auto;
  }
  .left{
  	background-color: yellow;
  }
  </style>	
  ```

  ​

* 圣杯布局

  ```css
  <div class="box">
  		<header>header</header>
  		<main>main</main>
  		<nav>nav</nav>
  		<aside>aside</aside>
  		<footer>footer</footer>
  </div>
  .box{
  	display: grid;
  	width: 100vw;
  	height: 100vh;
  	grid-template-columns:80px 1fr 1fr 1fr 80px;
  	grid-template-rows:80px 1fr 1fr 80px;
  	grid-template-areas:'title title title title title '
  						'nav main main main aside'
  						'nav main main main aside'
  						'footer footer footer footer footer';
  	font-size: 30px;
  	text-align: center;
  }

  header{
  	grid-area:title;
  	background-color: blue;
  }
  nav{
  	grid-area:nav;
  	background-color: red;
  }

  main{
  	grid-area:main;
  	background-color: gray;
  }

  aside{
  	grid-area:aside;
  	background-color: yellow;
  }

  footer{
  	grid-area:footer;
  	background-color: green;
  }
  ```



#### flex 布局

Flex 布局是弹性布局。 任何一个容器都可以指定flex布局。 

```css
.box{
   display: flex;
}
/* 行内样式 */
.box{
    display: inline-flex;
}
```



#### 容器的属性 有6个属性设置在容器上

* flex-direction 主轴的方向 默认row

  row：左边为起点

  row-reverse: 右边为起点

  column: 主轴为垂直方向 起点在上

  column-reverse: 主轴为垂直方向 起点在下沿

* flex-wrap 如果一条轴线排不下 怎么排  默认不换行

  如果你的子容器定义了某个像素值。但是你没设置换不换行。那么还是会不换行 会均分

  warp: 换行

  no-warp：不换行。

  wrap-reverse: 第一行在下面

  ```css
  .box{
    display: flex;    
    /* 如果你不设置 默认设置no-wrap 不换行 那么子元素会均分*/
    flex-wrap: wrap; 
  }
  .item{
    width: 500px;
    margin: 10px;
  }
  ```

  ​

* flex-flow 是 flex-direction 属性和 flex-wrap 属性的简写 默认 row nowrap

  ​

* justify-content 属性 主轴的对齐方式 就是X轴。(如果子元素设置flex: 1; 会无效)

  flex-start: 左对齐。

  flex-end: 右对齐

  center: 中间对齐

  space-between：两端对齐 项目之间 的间隔都相等

  space-around：每个项目两侧的间隔相等

  ​

* align-items  属性定义项目在交叉轴上如何对齐

  - `flex-start`：交叉轴的起点对齐。

  - `flex-end`：交叉轴的终点对齐。

  - `center`：交叉轴的中点对齐。

  - `baseline`: 项目的第一行文字的基线对齐。

  - `stretch`（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度。

    ​

* align-content 属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。

  - `flex-start`：与交叉轴的起点对齐。

  - `flex-end`：与交叉轴的终点对齐。

  - `center`：与交叉轴的中点对齐。

  - `space-between`：与交叉轴两端对齐，轴线之间的间隔平均分布。

  - `space-around`：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。

  - `stretch`（默认值）：轴线占满整个交叉轴。

    ​



#### 子容器的项目设置

* order

  order属性定义项目的排列顺序 数值越小 排列越靠前 默认0

  ![border](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071013.png)

* flex-grow 项目的放大比例 默认0 

  ![border](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071014.png)

* flex-shrink 属性 项目的缩小比例 默认为1

  ​

* flex-basis: 定义了在分配多余空间之前 项目占据的主轴空间 浏览器根据这个属性 计算主轴是否多余空间 默认auto。 即项目的本来大小。

  ​

* `flex`属性是`flex-grow`, `flex-shrink` 和 `flex-basis`的简写，默认值为`0 1 auto`。后两个属性可选。

  一般有快捷键 0 0 auto。 1 1 auto。 建议优先使用这个属性。 而不是单独分离三个属性。

  ​

* `align-self`属性允许单个项目有与其他项目不一样的对齐方式，可覆盖`align-items`属性。默认值为`auto`，表示继承父元素的`align-items`属性，如果没有父元素，则等同于`stretch`。

















