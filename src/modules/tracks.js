/**
 * @author bubao 
 * @description 单个专辑的下载链接
 * @date: 2018-06-27 18:11:17 
 * @Last Modified by: bubao
 * @Last Modified time: 2019-03-04 13:35:10
 */
const template = require("lodash/template");
const concat = require("lodash/concat");
const isNumber = require("lodash/isNumber");
const API = require("../api");
const { path, request } = require('../tools/commonModules');

/**
 * 获取专辑中的音频链接列表
 * @param {String} albumId 专辑ID require
 * @param {Array} arr 递归音频链接列表数组
 * @param {Number} pageNum 页数
 */
const getTracksList = async (albumId, arr = [], pageNum = 1) => {
	let opts;
	let single = false;
	if (isNumber(albumId)) {
		opts = {
			uri: template(API.getTracksList)({ albumId: albumId, pageNum }),
			headers: API.headers
		}
		single = JSON.parse((await request({
			uri: template(API.album)({ albumId })
		})).body);
	} else {
		opts = {
			uri: template(API.getTracksList)({ albumId: albumId.albumID, pageNum }),
			headers: API.headers
		}
	}

	let { body, error } = await request(opts);
	body = JSON.parse(body);
	console.log(error)
	body.data.tracks = body.data.tracks.map(value => {
		if (single) {
			value.albumTitle = single.data.mainInfo.albumTitle;
		} else {
			value.albumTitle = albumId.albumTitle;
		}
		return value;
	});
	arr = concat(arr, body.data.tracks);
	if (!(body.data.tracks.length < 30) || pageNum * 30 === body.data.trackTotalCount) {
		return await getTracksList(albumId, arr, pageNum + 1);
	} else {
		return arr;
	}
}

/**
 * 获取所有的音频下载链接
 * @param {Array} tracksList 音频链接列表
 * @param {Array} list 音频下载链接列表
 */
const getTracks = async (tracksList, list = []) => {

	if (tracksList.length) {
		const item = tracksList.splice(0, 1)[0];
		if (item.url) {
			let opts = {
				uri: template(API.tracks)({ tracksId: path.basename(item.url) }),
				headers: API.headers
			}
			let { body, error } = await request(opts);
			console.log(error)
			const data = JSON.parse(body);
			list.push({
				uri: data.play_path_64,
				albumTitle: item.albumTitle,
				title: item.title
			});
		}
		return await getTracks(tracksList, list);
	} else {
		return list;
	}
}

/**
 * 单个专辑的下载链接
 * @param {Obj} albumId 专辑ID
 */
module.exports = async (albumId) => await getTracks(await getTracksList(albumId));