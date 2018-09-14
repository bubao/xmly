/**
 * @author bubao 
 * @description 
 * @date: 2018-09-14 19:08:17 
 * @Last Modified by: bubao
 * @Last Modified time: 2018-09-14 19:11:06
 */

let aria = (list = [], out = "./") => {
    let str = "";
    if (list.length) {
        list.forEach((value) => {
            let { uri, title } = value
            str += `${uri}\n\tout=${title.trim()}.m4a\n\tdir=${out}\n`
        });
        return str;
    } else {
        return "";
    }
}

module.exports = aria;