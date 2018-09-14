/**
 * @author bubao 
 * @description 单个专辑的下载链接
 * @date: 2018-06-27 18:11:17 
 * @Last Modified by: bubao
 * @Last Modified time: 2018-09-14 19:12:26
 */
const template = require("lodash/template");
const concat = require("lodash/concat");
const API = require("../api");
const { path, request } = require('../tools/commonModules');

/**
 * 获取专辑中的音频链接列表
 * @param {String} albumId 专辑ID require
 * @param {Array} arr 递归音频链接列表数组
 * @param {Number} pageNum 页数
 */
const getTracksList = async (albumId, arr = [], pageNum = 1) => {
    const opts = {
        uri: template(API.getTracksList)({ albumId, pageNum })
    }

    const body = JSON.parse((await request(opts)).body);
    arr = concat(arr, body.data.tracks);
    if (!(body.data.tracks.length < 30) || pageNum * 30 === body.data.trackTotalCount) {
        return await getTracksList(albumId, arr, pageNum + 1);
    } else {
        return arr;
    }
}

/**
 * 获取所有的音频下载链接
 * @param {Array} list 音频链接列表
 * @param {String} out 下载位置
 * @param {String} str aria2c 下载文件
 */
// const getTracks = async (list, out = "./", str = "") => {
// 	const item = list.splice(0, 1)[0];
// 	const data = JSON.parse((await request({
// 		uri: template(API.tracks)({ tracksID: path.basename(item.url) }),
// 	})).body);
// 	str += `${data.play_path_64}\n\tout=${trim(item.title)}.m4a\n\tdir=${out}\n`
// 	if (list.length) {
// 		return await getTracks(list, out, str);
// 	} else {
// 		return str;
// 	}
// }

/**
 * 获取所有的音频下载链接
 * @param {Array} tracksList 音频链接列表
 * @param {Array} list 音频下载链接列表
 */
const getTracks = async (tracksList, list = []) => {
    const item = tracksList.splice(0, 1)[0];
    const data = JSON.parse((await request({
        uri: template(API.tracks)({ tracksID: path.basename(item.url) }),
    })).body);
    list.push({
        uri: data.play_path_64,
        title: item.title
    })
    if (tracksList.length) {
        return await getTracks(tracksList, list);
    } else {
        return list;
    }
}

// module.exports = async (albumId, path = "./list.txt", out) => {
// 	const list = await getTracksList(albumId);
// 	fs.writeFileSync(path, await getTracks(list, out));
// }

/**
 * 单个专辑的下载链接
 * @param {Number} albumId 专辑ID
 */
module.exports = async (albumId) => {
    const tracksList = await getTracksList(albumId);
    return await getTracks(tracksList);
}

exports.getTracks = getTracks;

exports.getTracksList = getTracksList;