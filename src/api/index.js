/**
 * @author bubao 
 * @description 
 * @date: 2018-09-14 19:08:08 
 * @Last Modified by: bubao
 * @Last Modified time: 2019-03-04 13:27:48
 */
module.exports = {
	headers: {
		Host: "www.ximalaya.com",
		"User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36"
	},
	tracks: "http://www.ximalaya.com/tracks/<%=tracksId%>.json",
	getTracksList: "http://www.ximalaya.com/revision/album/getTracksList?albumId=<%=albumId%>&pageNum=<%=pageNum%>",
	album: "http://www.ximalaya.com/revision/album?albumId=<%=albumId%>",
	pub: "https://www.ximalaya.com/revision/user/pub?page=<%=pageNum%>&pageSize=<%=pageSize%>&keyWord=&uid=<%=uid%>", //专辑
}