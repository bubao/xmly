/**
 * @author bubao 
 * @description 
 * @date: 2018-09-14 19:08:25 
 * @Last Modified by: bubao
 * @Last Modified time: 2018-11-11 11:08:40
 */
let tracks = require("./src/modules/tracks");
let albums = require("./src/modules/albums");
let aria2c = require("./src/tools/aria2c");
let _ = require("lodash");
let loop = async (al, arr = [], i = 0) => {

	if (al.length === 0) {
		return arr
	} else {
		let item = al.splice(0, 1)[0];

		let c = await tracks(item);
		arr = _.concat(arr, c);
		return await loop(al, arr, i++);
	}
}
let DownAlbums = async (ID) => {
	let al = await albums(ID);
	let trackArray = await loop(al);
	return aria2c(trackArray);
}

let DownTracks = async (ID) => {
	let trackArray = await tracks(ID);
	return aria2c(trackArray);
}



module.exports = {
	loop,
	tracks,
	DownAlbums,
	DownTracks,
	albums,
	aria2c,
}