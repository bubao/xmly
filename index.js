/**
 * @author bubao 
 * @description 
 * @date: 2018-09-14 19:08:25 
 * @Last Modified by: bubao
 * @Last Modified time: 2019-03-04 12:54:37
 */
const tracks = require("./src/modules/tracks");
const getAlbums = require("./src/modules/albums");
const { aria2c } = require("./src/tools/commonModules");
const concat = require("lodash/concat");
const loop = async (albumsList, arr = [], i = 0) => {

	if (albumsList.length === 0)
		return arr;
	return await loop(albumsList, concat(arr, await tracks(albumsList.splice(0, 1)[0])), i++);
};

const albums = async (albumsID) => await loop(await getAlbums(albumsID));

const downAlbums = async (albumsID) => aria2c(await albums(albumsID));

const downTracks = async (tracksID) => aria2c(await tracks(tracksID));

module.exports = {
	loop,
	albums,
	tracks,
	getAlbums,
	downAlbums,
	downTracks,
	aria2c,
}