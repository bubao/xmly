/**
 * @description: 
 * @author: bubao
 * @date: 2021-02-28 23:09:37
 * @last author: bubao
 * @last edit time: 2021-03-01 00:12:37
 */
const { random } = require('lodash');
const md5 = require('blueimp-md5');
const request = require('request');

const BASE_URL = 'https://www.ximalaya.com/revision'
function sign() {
	const url = BASE_URL + '/time';
	return new Promise((resolve, reject) => {
		request(url, (error, response, body) => {
			if (error) {
				reject({
					ret: 0,
					message: '时间戳请求失败',
					data: error
				})
			} else {
				resolve(transformSign(body));
			}
		});
	});
}

// (ximalaya-服务器时间戳) +(100以内的随机数) + 服务器时间戳 + (100以内的随机数) + 现在的时间戳
function transformSign(time) {
	return `${md5(`himalaya-${time}`)}(${random(0, 100)})${time}(${random(0, 100)})${Date.now()}`;
}

module.exports = sign;

sign().then(console.log)