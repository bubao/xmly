/**
 * @author bubao 
 * @description 
 * @date: 2018-06-27 18:11:17 
 * @Last Modified by: bubao
 * @Last Modified time: 2018-06-28 11:58:13
 */
const template = require("lodash/template");
const concat = require("lodash/concat");
const trim = require("lodash/trim");
const cfg = require("./config/index");
const { path, request, fs } = require('./tools/commonModules');

const getTracksList = async (albumId, arr = [], pageNum = 1) => {
	const opts = {
		uri: template(cfg.getTracksList)({ albumId, pageNum })
	}

	const body = JSON.parse((await request(opts)).body);
	arr = concat(arr, body.data.tracks);
	if (!(body.data.tracks.length < 30) || pageNum * 30 === body.data.trackTotalCount) {
		return await getTracksList(albumId, arr, pageNum + 1);
	} else {
		return arr;
	}
}

const getTracks = async (list, out = "./", str = "") => {
	const item = list.splice(0, 1)[0];
	const data = JSON.parse((await request({
		uri: template(cfg.tracks)({ tracksID: path.basename(item.url) }),
	})).body);
	str += `${data.play_path_64}\n\tout=${trim(item.title)}.m4a\n\tdir=${out}\n`
	if (list.length) {
		return await getTracks(list, out, str);
	} else {
		return str;
	}
}

module.exports = async (albumId, path = "./list.txt", out) => {
	const list = await getTracksList(albumId);
	fs.writeFileSync(path, await getTracks(list, out));
}
