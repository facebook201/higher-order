cookies session webStorage等区别

Cookies http://mertensming.github.io/2016/10/20/practice-cookie/



```javascript
const express = require('express')
const app = express()
app.listen(3000, err => {
  if (err) {
    return console.log(err)
  }
  console.log('---- 打开 http://localhost:3000 吧----')
})
app.get('/', (req, res) => {
  res.send('<h1>hello world!</h1>')
})
// 在命令行执行
node main.js
// 一个本地服务就跑起来了，现在打开 http://localhost:3000
// 就可以看到一个大大的 hello world!
```



#### Cookie 是怎么工作的

* 1 首先 如果当前域名下没有cookie
* 浏览器发送一个请求给服务器 请求没有带上 cookie
* 服务器设置cookie发送给浏览器
* 浏览器保存起来
* 下来 每次都会带上 发给服务器



#### 验证

现在打开 `http://localhost:3000`

1. 我们看到 `Request Headers` 并没有 Cookie 这个字段
2. 但是 `Response Headers` 有了 `Set-Cookie` 这个字段

现在我们刷新一下页面，相当于重新向 `http://localhost:3000/` 这个地址发起了一次请求。

现在我们就可以看到 Cookie 字段已经带上了，再刷新几次看 Cookie 也还是在的。



#### 什么是Cookie

- Cookie 就是浏览器储存在用户电脑上的一小段文本文件
- Cookie 是纯文本格式，不包含任何可执行的代码
- Cookie 由键值对构成，由分号和空格隔开
- Cookie 虽然是存储在浏览器，但是通常由服务器端进行设置
- Cookie 的大小限制在 4kb 左右



#### Cookie的属性选项

每个 Cookie 都有一定的属性，如什么时候失效，要发送到哪个域名，哪个路径等等。在设置任一个 Cookie 时都可以设置相关的这些属性，当然也可以不设置，这时会使用这些属性的默认值。



> expires 有效期设置

`expires / max-age` 都是控制 Cookie `失效时刻`的选项。如果没有设置这两个选项，则默认有效期为 session，即会话 Cookie。这种 Cookie 在浏览器关闭后就没有了。

expires 选项设置Cookie 什么时间有效。 expries 其实是Cookie 失效日期 。**必须是GMT格式的时间**。 ( new Date(Date.now() + 1000)); 

**GMT时间是指世界标准时间。例如北京时间就是GMT+8 GMT也就是0时区的时间**

```javascript
app.get('/', (req, res) => {
  // 这个 Cookie 设置十秒后失效
  res.cookie('testName0', 'testValue0', {
    expires: new Date(Date.now() + 100000)
  })
  // 这个 Cookie 不设置失效时间
  res.cookie('testName1', 'testValue1')
  res.send('<h1>hello world!</h1>')
})
```



#### max-age 

max-age 是http1.1协议的。expires是1.0 的协议。 两者的作用都是限制Cookie的有效时间。 expires 的值是一个时间点。 ( Cookie失效时间 = expires )。 max-age 是一个以秒为单位时间段( Cookie 失效时间 = 创建时间 + max-age )

如果同时设置了 max-age 和 expires，以 max-age 的时间为准。

```javascript
app.get('/', (req, res) => {
  res.cookie('name0', 'value0')
  res.cookie('name1', 'value1', {
    expires: new Date(Date.now() + 30 * 1000),
    maxAge: 60 * 1000
  })
  res.cookie('name2', 'value2', {
    maxAge: 60 * 1000
  })
  res.send('<h1>hello world!</h1>')
})
```



#### domain 和 path

`name`、`domain` 和 `path` 可以标识一个唯一的 Cookie。`domain` 和 `path` 两个选项共同决定了 Cookie 何时被浏览器自动添加到请求头部中发送出去。具体是什么原理请看 [Cookie 的作用域和作用路径](http://mertensming.github.io/2016/10/20/practice-cookie/#Cookie-%E7%9A%84%E4%BD%9C%E7%94%A8%E5%9F%9F%E5%92%8C%E4%BD%9C%E7%94%A8%E8%B7%AF%E5%BE%84) 这个章节。

如果没有设置这两个选项，则会使用默认值。`domain` 的默认值为设置该 Cookie 的网页所在的域名，`path` 默认值为设置该 Cookie 的网页所在的目录。



#### secure

secure 选项用来设置 Cookie 只在确保安全的请求中才会发送。当请求是 HTTPS 或者其他安全协议时，包含 secure 选项的 Cookie 才能被保存到浏览器或者发送至服务器。

默认情况下，Cookie 不会带 secure 选项(即为空)。所以默认情况下，不管是 HTTPS 协议还是 HTTP 协议的请求，Cookie 都会被发送至服务端。



#### httponly

这个选项用来设置 Cookie 是否能通过 js 去访问。默认情况下，Cookie 不会带 `httpOnly` 选项(即为空)，客户端是可以通过 js 代码去访问（包括读取、修改、删除等）这个 Cookie 的。当 Cookie 带 `httpOnly`选项时，客户端则无法通过 js 代码去访问（包括读取、修改、删除等）这个 Cookie。





### 优缺点

* 虽然cookie方便 但是它可以被修改。 所以一些重要的数据就不能被放在cookie里面
* 如果数据太多就不适合放在cookie里面





### session

为了解决这些问题 session就产生了。 

* 每个session对应了一个session_id。通过session_id 查询到对应的session。
* session_id 通常是存放在客户端的 服务端存好session 之后将对应的session_id 设置在cookie 中发送给客户端
* 当请求到来的时候 服务端检查cookie中保存的session_id 并通过这个session_id 与服务器端的seesion关联起来 进行数据的保存和修改

当你浏览一个网页时，服务端随机产生一个很长的字符串，然后存在你 cookie 中。当你下次访问时，cookie 会带有这个字符串，然后浏览器就知道你是上次访问过的某某某，然后从服务器的存储中取出上次记录在你身上的数据。由于字符串是随机产生的，而且位数足够多，所以也不担心有人能够伪造。



### session存储

session存储一般有四个选项 内存 cookie 缓存 数据库

1. 内存：开发环境存内存比较方便，问题是不能够共享状态（只能在本机访问）
2. cookie：使用 cookie 来储存 session 的话，session 保存在用户浏览器端，每次用户访问时，都会主动带上他自己的信息。安全性的话，只要遵照最佳实践来，也是有保证的。它的弊端是增大了数据量传输，好处是比较方便
3. 缓存：可以共享
4. 数据库：可以共享

如果非要使用 cookie 来记录登陆的用户凭证，也不是不可以，只需要做一些对 cookie 做一个哈希处理就好了。

这样一来，用户就没法伪造信息了。一旦它更改了 cookie 中的信息，则服务器会发现 hash 校验的不一致。

毕竟他不懂我们的 secret_string 是什么，而暴力破解哈希值的成本太高。