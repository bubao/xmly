/**
 * @author bubao 
 * @description 
 * @date: 2018-09-14 19:08:25 
 * @Last Modified by: bubao
 * @Last Modified time: 2018-09-15 23:14:22
 */
let tracks = require("./modules/tracks");
let albums = require("./modules/albums");
let aria2c = require("./tools/aria2c");
let _ = require("lodash")
let loop = async (al, arr = [], i = 0) => {

	if (al.length === 0) {
		return arr
	} else {
		let item = al.splice(0, 1)[0];

		let c = await tracks(item)
		console.log("c", c.length)
		arr = _.concat(arr, c);

		console.log(arr.length)
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
	tracks,
	DownAlbums,
	DownTracks,
	albums,
	aria2c,
}