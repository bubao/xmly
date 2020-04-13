/**
 * @author bubao 
 * @description 
 * @date: 2018-09-14 19:08:17 
 * @Last Modified by: bubao
 * @Last Modified time: 2019-03-04 12:20:04
 */

const filenamify = require("filenamify");
let aria2c = (list = [], dir) => {
	let str = "";
	if (list.length) {
		list.forEach((value) => {
			let { uri, title, albumTitle } = value;
			str += `${uri}\n\tout=${filenamify(title.trim())}.m4a\n\tdir=${dir ? dir : "./"}${filenamify(albumTitle.trim())}\n`
		});
		return str;
	}
	return str;
}

module.exports = aria2c;