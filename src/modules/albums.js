/**
 * @author bubao 
 * @description 
 * @date: 2018-09-14 19:08:02 
 * @Last Modified by: bubao
 * @Last Modified time: 2018-09-14 19:11:48
 */
const template = require("lodash/template");
const concat = require("lodash/concat");
const API = require("../api");
const { request } = require('../tools/commonModules');


let getAlbumList = async (uid, pageSize, arr = [], pageNum = 1) => {
    const opts = {
        uri: template(API.pub)({ uid, pageSize, pageNum })
    }
    const body = JSON.parse((await request(opts)).body);
    arr = concat(arr, body.data.albumList);
    if (!(body.data.albumList.length < pageSize) || pageNum * pageSize === body.data.trackTotalCount) {
        return await getAlbumList(uid, pageSize, arr, pageNum + 1);
    } else {
        return arr;
    }
}

exports.getAlbumList = getAlbumList;

let getAlbums = async (albumList, list = []) => {
    const item = albumList.splice(0, 1)[0];
    list.push({
        albumID: item.id,
        title: item.title,
        coverPath: item.coverPath
    });
    if (albumList.length) {
        return await getAlbums(albumList, list);
    } else {
        return list;
    }
}

module.getAlbums = getAlbums;

module.exports = async (uid, pageSize = 30) => {
    let albumList = await getAlbumList(uid, pageSize);
    return await getAlbums(albumList);
}