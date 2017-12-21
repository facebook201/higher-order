### 修改配置文件

nginx配置文件在 nginx-1.8.0\config\nginx.conf 

```js
http {
     gzip  on;

    #静态文件
    server {
        listen       80;
        server_name  static.cnblog.com;

        location / {
            root   G:/source/static_cnblog_com;
        }
    }

    #html文件
    server {
        listen       80;
        server_name  127.0.0.1 localhost;

        location / {
            root   G:/source/html/mobile/dist;
            index  index.html index.htm;
        }
    }
}

```

### 启动

> 不要双击 nginx.exe 这样会导致配置后重启 

使用命令 启动 关闭 重启 nginx

* start nginx 启动
* nginx -s reload 修改配置后重新加载生效
* nginx -s reopen 重新打开日志文件
* nginx -t -c /path/to/nginx.conf 测试nginx配置文件是否正确

#### 关闭 nginx
* nginx -s stop 快速停止 nginx
* nginx -s quit 完整有序的停止nginx

