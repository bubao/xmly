/**
 * @author bubao 
 * @description 
 * @date: 2018-09-14 19:08:35 
 * @Last Modified by: bubao
 * @Last Modified time: 2018-09-15 22:47:39
 */
let xmly = require("../src/index")
let fs = require("fs");
// (async () => fs.writeFileSync("Z:\\xmly/1000341.txt", await xmly.DownAlbums(1000341)))();
(async () => fs.writeFileSync("Z:\\xmly/14129954.txt", await xmly.DownTracks(14129954)))();

// xmly(3152352, __dirname + "/list.txt")