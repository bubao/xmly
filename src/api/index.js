/**
 * @author bubao 
 * @description 
 * @date: 2018-09-14 19:08:08 
 * @Last Modified by: bubao
 * @Last Modified time: 2018-09-15 10:19:22
 */
module.exports = {
	tracks: "http://www.ximalaya.com/tracks/<%=tracksId%>.json",
	getTracksList: "http://www.ximalaya.com/revision/album/getTracksList?albumId=<%=albumId%>&pageNum=<%=pageNum%>",
	album: "http://www.ximalaya.com/revision/album?albumId=<%=albumId%>",
	pub: "https://www.ximalaya.com/revision/user/pub?page=<%=pageNum%>&pageSize=<%=pageSize%>&keyWord=&uid=<%=uid%>", //专辑
}