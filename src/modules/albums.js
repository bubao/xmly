/**
 * @author bubao 
 * @description 获取所有专辑列表
 * @date: 2018-09-14 19:08:02 
 * @Last Modified by: bubao
 * @Last Modified time: 2019-03-04 12:50:15
 */
const template = require("lodash/template");
const concat = require("lodash/concat");
const API = require("../api");
const { request } = require('../tools/commonModules');

/**
 * @description
 * @author bubao
 * @param {number|string} uid
 * @param {number} pageSize
 * @param {any} [arr=[]]
 * @param {number} [pageNum=1]
 * @returns
 */
async function getAlbumList(uid, pageSize, arr = [], pageNum = 1) {
	const body = JSON.parse((await request({ uri: template(API.pub)({ uid, pageSize, pageNum }) })).body);
	arr = concat(arr, body.data.albumList);
	if (!(body.data.albumList.length < pageSize) || pageNum * pageSize === body.data.trackTotalCount)
		return await getAlbumList(uid, pageSize, arr, pageNum + 1);
	return arr;
}

/**
 * @description
 * @author bubao
 * @param {array} albumList
 * @param {array} [list=[]]
 * @returns
 */
async function getAlbums(albumList, list = []) {

	if (albumList.length === 0)
		return list;
	const { id, title, coverPath } = albumList.splice(0, 1)[0];
	list.push({
		albumID: id,
		albumTitle: title,
		coverPath: coverPath
	});
	return await getAlbums(albumList, list);
}

module.exports = async (uid, pageSize = 30) => await getAlbums(await getAlbumList(uid, pageSize));