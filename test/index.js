/**
 * @author bubao 
 * @description 
 * @date: 2018-09-14 19:08:35 
 * @Last Modified by: bubao
 * @Last Modified time: 2018-09-15 10:35:35
 */
let xmly = require("../src/index")
let fs = require("fs");
; (async () => fs.writeFileSync("./list.txt", await xmly.Down(1732828)))();

// xmly(3152352, __dirname + "/list.txt")