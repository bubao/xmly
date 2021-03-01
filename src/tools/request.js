/**
 * @author bubao 
 * @description 封装request
 * @date: 2018-3-22
 * @Last Modified by: bubao
 * @Last Modified time: 2019-03-04 12:14:35
 */

const EventEmitter = require('events');
const Request = require('request');
const fs = require('fs');
const sign = require('./sign')

class PromisRequest extends EventEmitter {
	constructor(){
		super()
		this.request = this.request.bind(this)
	}
	static init() {
		if (!this.instance) {
			this.instance = new this();
		}
		return this.instance;
	}

	async request(options) {
		if (!this.sign) {
			
			this.sign = await sign()
		}
		return new Promise((resolve) => {
			const { pipe, hiden, time, size, readable, ...opts } = options;
			opts.headers = {...opts.headers ,'xm-sign':this.sign};
			const start = startNum(time);
			let read = getRead(options);
			let response = 0;
			let total = 0;
			let buffer = Buffer.alloc(0);
			const res = Request(opts, function (error, res, body) {
				this.removeListener("process", () => { });
				resolve({ error, response: res, body, read, bufferBody: buffer.toString("utf8") });
			}).on('response', (resp) => {
				response = getLength(resp.headers['content-length'], size);
			}).on('data', function (data) {
				read += data.length;
				if (readable) buffer = Buffer.concat([buffer, data]);
				total = getTotal(size, response, read);
				this.emit("process", {
					completed: read, total, hiden, time: { start }, status: { down: '正在下载...', end: '完成\n' }
				});
			});
			// 如果 pipe参数存在，则下载到指定路径
			download(res, pipe);
		});
	}
}

function download(data, dir) {
	if (dir && dir.length) data.pipe(fs.createWriteStream(dir || './'));
}

function getTotal(size, response, read) {
	return (((size !== undefined || response === undefined) && size >= read) ? size : response || read + 1);
};

function startNum(time) {
	return time !== undefined ? time.start : new Date().valueOf() / 1000;
};
function getLength(contentLength, size) {
	let length = contentLength || size;
	return length ? parseInt(length || 0, 10) : 0;
}

function getRead(options) {
	return (options.read || 0);
};

module.exports = new PromisRequest();