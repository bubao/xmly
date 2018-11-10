# README

喜马拉雅API，可以获得音频下载链接

## 使用

### 安装

```sh
$npm i
```

### Demo

喜马拉雅音频下载连接，适用于aria2批量下载

```sh
$vim test/index.js
```

```js
let xmly = require("../src/index")
let fs = require("fs");
// (async () => fs.writeFileSync("Z:\\xmly/list.txt", await xmly.DownAlbums(1000341)))();
(async () => fs.writeFileSync("Z:\\xmly/list.txt", await xmly.DownTracks(14129954)))();
```

### API

提供以下api

- tracks(albumId),
- albums(uid,pageSize=30),
- DownAlbums(uid),
- DownTracks(albumId),
- aria2c(array,dir="./")

### 运行

```sh
$npm run test
```

### aria2 批量下载

使用aria2c下载list中的资源。

```sh
$aria2c -c --input-file=list.txt
```