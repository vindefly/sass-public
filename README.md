# static - html , 执行以下命令
```
$ npm install
```

# 如果 node-sass 安装失败的问题，请执行以下命令
```
$ npm install --save node-sass --registry=https://registry.npm.taobao.org --disturl=https://npm.taobao.org/dist --sass-binary-site=http://npm.taobao.org/mirrors/node-sass
```

# 执行完成npm install 后 把 ‘fix_node_modules’ 以下的文件夹，复制到 ‘node_modules’ 下替换。
```
$ 默认的生成版本例: image-MD5.png，我们要的版本结果是为了生成images.png?v=MD5版本号。
```

# gulp启动指定xxx目录项目 - 如果不引用lib建议只启动sign
```
$ gulp sign
```

# gulp启动全局服务-指定xxx目录项目 watch ， 如果需要用到lib请启动default
```
$ gulp default
```