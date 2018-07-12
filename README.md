# README

喜马拉雅音频下载连接，适用于aria2批量下载

## 使用

### 安装

```sh
$npm i
```

### 修改配置

```sh
$vim test/index.js
```

```js
xmly(3152352, __dirname + "/list.txt","./");
```

### xmly接收三个参数

1. 专辑的id
2. list.txt 文件的位置
3. aria2下载音频的路径

### 运行

```sh
$npm run test
```

### aria2 批量下载

```sh
$aria2c -c --input-file=list.txt
```