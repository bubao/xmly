/**
 * @author bubao 
 * @description 
 * @date: 2018-09-14 19:08:17 
 * @Last Modified by: bubao
 * @Last Modified time: 2018-11-10 19:09:19
 */

const filenamify = require("filenamify");
let aria = (list = [], dir) => {
	let str = "";
	if (list.length) {
		list.forEach((value) => {
			let { uri, title, albumTitle } = value
			str += `${uri}\n\tout=${filenamify(title.trim())}.m4a\n\tdir=${dir ? dir : "./"}${filenamify(albumTitle.trim())}\n`
		});
		return str;
	} else {
		return str;
	}
}

module.exports = aria;