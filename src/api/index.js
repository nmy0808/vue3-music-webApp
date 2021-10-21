import netWork from '@/api/netWork'
export const getBanner = () => netWork.get('/banner', { type: 2 })
// 推荐歌单
export const getPersonalized = () => netWork.get('/personalized', { limit: 6 })
// 最新专辑
export const getAlbum = () => netWork.get('/album/newest')
// 推荐新音乐
export const getNewSong = () => netWork.get('/personalized/newsong')
// 获取歌单详情包括榜单详情 `id=xx`
export const getPlayDetail = (data) => netWork.get('/playlist/detail', data)
// 获取专辑内容
export const getAlbumDetail = (data) => netWork.get('/album', data)
// 获取歌曲详情 `/song/detail?ids=347230,347231`
export const getSongDetail = (data) => netWork.get('/song/detail', data)
// 获取歌词
export const getLyric = (data) => netWork.get('/lyric', data)
// 获取音乐 url  `/song/url?id=405998841,33894312`
export const getMusic = (data) => netWork.get('/song/url', data)
// 热门歌手   `/top/artists?offset=0&limit=30`
export const getArtists = (data) => netWork.get('/top/artists', data)
// 歌手分类列表  `/artist/list?type=1&area=96&initial=b`
export const getArtistList = (data) => netWork.get('/artist/list', data)
// 获取歌手单曲 获得歌手部分信息和热门歌曲  `/artists?id=6452`歌手id
export const getArtist = (data) => netWork.get('/artists', data)
// 所有榜单
export const getTopList = (data) => netWork.get('/toplist', data)
// 搜索  `/search?keywords= 海阔天空`
export const getSearchKeyword = (data) => netWork.get('/search', data)
// 热搜列表(简略)
export const getHotList = (data) => netWork.get('/search/hot', data)
