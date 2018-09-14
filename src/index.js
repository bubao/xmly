/**
 * @author bubao 
 * @description 
 * @date: 2018-09-14 19:08:25 
 * @Last Modified by: bubao
 * @Last Modified time: 2018-09-14 23:10:46
 */
let tracks = require("./modules/tracks");
let albums = require("./modules/albums");
let aria2c = require("./tools/aria2c");

let Down = async (ID, out) => {
	let al = await albums(ID)
	let trackArray = []
	al.forEach(element => {
		trackArray.push(await tracks(element))
	});
	let str = ""
	trackArray.forEach(element => {
		str += aria2c(element, out);
	});
	return str;
}

module.exports = {
	tracks,
	albums,
	aria2c,
	Down,
}