/**
 * @author bubao 
 * @description 
 * @date: 2018-03-15
 * @Last Modified by: bubao
 * @Last Modified time: 2019-03-04 12:16:51
 */

const fs = require('fs');
const path = require('path');
const { request } = require('./request');
const aria2c = require("./aria2c")

module.exports = {
	fs,
	path,
	aria2c,
	request,
};