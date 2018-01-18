### 目标链接地址

首先打开QQ音乐的播放界面。打开控制台 监控网络请求：

在media里面可以看到有一个请求。 双击之后就会跳到该链接地址。



#### 链接的构成

http://dl.stream.qqmusic.qq.com/C400${音乐mid}.m4a?vkey=${value}}&formtag=66.

在这个连接中，包括以下参数：
固定参数：guid/uin/fromtag
变化参数：songmid/vkey
那么，这些参数哪里来呢？



#### 3 参数来源

在监控网络请求的地方 同时还会发现以下请求

fcg_music_express_mobiles

所以要想获得这个音乐链接地址。需要发送两个请求 关键是获取vkey。



#### 4 代码操作

![border](https://upload-images.jianshu.io/upload_images/8361762-6637e1ddc455e845.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/522)



