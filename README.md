# lei-config
根据环境变量加载配置文件


## 安装

```bash
$ npm install lei-config --save
```


## 使用

使用：

```javascript
var config = require('lei-config');

// 初始化
config.init({
  envName: 'NODE_ENV',    // 环境变量名称，默认为NODE_ENV
  path: './config',       // 配置文件所在目录，默认为当前运行目录的config目录
  defaultName: 'default'  // 默认配置文件名，默认为default
});

// 载入并返回配置内容，如果之前没有调用config.init()，则会使用默认配置来调用config.init()
console.log(config.load());
// 或者手动指定环境名
console.log(config.load('development'));

// 设置配置（使用lei-ns实现）
config.set({
  a: 123,
  b: 456
});
config.set('a', 123);
config.set('b', 456);

// 读取配置项（使用lei-ns实现）
console.log(config.get());
console.log(config.get('a'));
```

配置文件`production.js`：

```javascript
module.exports = function (ns) {
  // 使用namespace来设置值，参考le-ns模块
  ns('a.b.c', 123);
  ns('a.y.y', 456);
}
```


## 授权

```
The MIT License (MIT)

Copyright (c) 2015 Zongmin Lei <leizongmin@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```