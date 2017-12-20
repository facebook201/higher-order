### OSI七层模型和 TCP/IP

- 应用层 文件传输 电子邮件 文件服务 虚拟终端 HTTP SNMP FTP SMTP DNS
  - 表示层数据格式化 代码转换 数据加密
  - 会话层解除或建立与别的接点的联系
    - 传输层提供端对端的接口TCP UDP
    - 网络层为数据包选择路由IP ICMP RIP OSPF BGP ICMP
  - 数据链路层 传输有地址的帧以及错误检测功能ARP PPP RARP MTU
  - 物理层 以二进制数据形式在物理媒体上传输数据IEEE802 ISO2110



### TCP 传输层协议

TCP最核心的概念是：**TCP是可靠的传输协议、所有的特点都为这个可靠传输服务** tcp在传输过程中都有一个ack，接收方通过ack告诉发送发收到那些包了。这样发送发能知道有没有丢包 进而确定重传。、

* 第一步 客户端发送syn到server发起握手。
* 第二步 服务端收到syn后回复syn+ack给客户端。
* 第三步 客户端收到syn+ack后 回复server一个ack表示已经收到server的syn+ack



## TCP的四次挥手

* 客户端主动发送XXX给server
* server回复ack给客户端。表示server知道client要断开
* 服务端发送XXX给客户端 表示服务端也可以断开
* 客户端回复ack给服务端表示双方都断开 那就断开吧

