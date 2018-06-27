/**
 * @author bubao 
 * @description 
 * @date: 2018-06-27 18:11:17 
 * @Last Modified by: bubao
 * @Last Modified time: 2018-06-27 18:14:27
 */
let template = require("lodash/template");
let concat = require("lodash/concat");
let trim = require("lodash/trim");
let cfg = require("./config/index");
let { path, request } = require('./tools/commonModules');
let fs = require("fs");


let getTracksList = async (albumId, arr = [], pageNum = 1) => {
	let opts = {
		uri: template(cfg.getTracksList)({ albumId, pageNum })
	}

	let body = JSON.parse((await request(opts)).body);
	arr = concat(arr, body.data.tracks);
	if (!(body.data.tracks.length < 30) || pageNum * 30 === body.data.trackTotalCount) {
		return await getTracksList(albumId, arr, pageNum + 1);
	} else {
		return arr;
	}
}

const donwTracks = async (list, out = "./", str = "") => {
	let item = list.splice(0, 1)[0];
	let data = JSON.parse((await request({
		uri: template(cfg.tracks)({ tracksID: path.basename(item.url) }),
	})).body);
	str += `${data.play_path_64}\n\tout=${trim(item.title)}.m4a\n\tdir=${out}\n`
	if (list.length) {
		return await donwTracks(list, out, str);
	} else {
		return str;
	}
}

let xmly = async (albumId, path = "./list.txt", out) => {
	let list = await getTracksList(albumId);
	fs.writeFileSync(path, await donwTracks(list, out));
}

module.exports = xmly;
