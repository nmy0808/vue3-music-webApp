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
