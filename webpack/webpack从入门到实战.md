### Webpack的安装 

* mkdir webpack && cd webpack
* cnpm webpack 
* cnpm  init 初始化项目
* cnpm install --save-dev webpack



### 创建文件 

|app

|--------- index.js

|--------- sum.js

|build

|--------- bundle.js // 打包出来的js



### webpack 命令修改

之前都是使用webpack 来执行命令。 可以在package.json 里面配置修改。

```json
"script": {
    "start": "webpack"
}
```

然后可以使用 npm  run start



### Loader 加载器

loader可以让我们使用更多的新技术

* Babel

  babel可以编译ES6 ES7的代码 而不用考虑浏览器的兼容性。 

  npm i --save-dev babel-loader babel-core babel-preset-env

  * babel-loader 让webpack知道如何运行babel
  * babel-core 可以看做编译器 怎么解析 ES6 代码
  * babel-preset-env 根据环境来解析代码 例如 node 和浏览器端

配置 babel

```javascript
module.exports = {
    //...
    module: {
        rules: [
          {
            // js 文件使用babel
            test: /\.js$/,
            // 使用哪个loader
            use: 'babel-loader',
            // 不包括路径
            exclude: /node_modules/
          }
        ]
    }
};

// 配置babel 使用.babelrc
{
    "presets": ["babel-preset-env"]
}

```



#### file-loader 和 url-loader

小图片转换成base64是url-loader 其他情况是file-loader

```javascript
    module: {
        rules: [
          {
            // 图片正则格式
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            // url-loader选项参数
            options: {
              limit: 10000,
              name: 'images/[name].[hash].[ext]'
            },
            // 不包括路径
            exclude: /node_modules/
          }
        ]
    }
```



#### CSS-loader style-loader

css-loader 可以支持import语法 解析css。 后者将解析出来的css 通过标签的形式插入到HTML中。

```javascript
module: {
    rules: [
        {
            test: /\.css$/,
            use: [
                'style-loader',
                {
                   loader: 'css-loader',
                   options: {
                     // 开启模块选项 生成hashcss 解决css变量名重复
                      modules: true   
                   }
                }
            ]
        }
    ]
}

// 但是如果大量的css代码整合到js里面也是有弊端的 大量的css代码会造成js文件过大 可以使用 
// extract-text-webpack-plugin

const ExtratTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
  module: {
   rules: [
      {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract({
              // 必须这样写 否则会报错
              fallback: 'style-loader',
              use: [{
                  laoder: 'css-loader',
                  options: {
                      module: true
                  }
              }]
          })
      },
    ]
  },
  // 插件列表
  plugins: [
    // 输出文件路径
    new ExtractTextPlugin("css/[name].[hash].css");
  ]
},
```



#### Webpack 强大的功能

* 生成Source Maps (使得调试容易)