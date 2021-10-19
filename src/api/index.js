import netWork from '@/api/netWork'

export const getBanner = () => netWork.get('/banner', { type: 2 })
// 推荐歌单
export const getPersonalized = () => netWork.get('/personalized', { limit: 6 })
// 最新专辑
export const getAlbum = () => netWork.get('/album/newest')
// 推荐新音乐
export const getNewSong = () => netWork.get('/personalized/newsong')
// 获取歌单详情
export const getPlayDetail = (data) => netWork.get('/playlist/detail', data)
// 获取专辑内容
export const getAlbumDetail = (data) => netWork.get('/album', data)
// 获取歌曲详情 `/song/detail?ids=347230,347231`
export const getSongDetail = (data) => netWork.get('/song/detail', data)
// 获取歌词
export const getLyric = (data) => netWork.get('/lyric', data)
// 获取音乐 url  `/song/url?id=405998841,33894312`
export const getMusic = (data) => netWork.get('/song/url', data)
