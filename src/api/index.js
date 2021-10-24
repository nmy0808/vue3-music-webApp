import netWork from '@/api/netWork'
import { getLetterChars } from '@/tool/indxe'

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
export const getHotArtists = (data) => netWork.get('/top/artists', data)
// 歌手分类列表  `/artist/list?type=1&area=96&initial=b`
export const getArtistList = (data) => netWork.get('/artist/list', data)
// 获取歌手单曲 获得歌手部分信息和热门歌曲  `/artists?id=6452`歌手id
export const getArtist = (data) => netWork.get('/artists', data)
// 所有榜单
export const getTopList = async (data) => {
  const res = await netWork.get('/toplist', data)
  return res.list
}
// 搜索  `/search?keywords= 海阔天空`
export const getSearchKeyword = async (data) => {
  const res = await netWork.get('/search', data)
  return res.result.songs
}
// 热搜列表(简略)
export const getHotList = async (data) => {
  const res = await netWork.get('/search/hot', data)
  return res.result.hots
}
// 根据关键词获取搜索列表
export const getHotListToKeyWord = async ({ keywords }) => {
  const result = []
  const songs = await getSearchKeyword({ keywords })
  if (!songs) {
    return []
  }
  for (const song of songs) {
    const obj = {}
    obj.name = song.name
    obj.id = song.id
    obj.singer = song.artists[0].name + ' - ' + song.album.name
    obj.picUrl = song.artists[0].img1v1Url
    if (obj.name.toLowerCase() !== ('null')) {
      result.push(obj)
    }
  }
  // 根据id获取对应封面
  const ids = songs.map(item => item.id).join(',')
  const songDetail = await getSongDetail({ ids })
  songDetail.songs.forEach(song => {
    const obj = result.find(item => item.id === song.id)
    obj.picUrl = song.al.picUrl
  })
  return result
}
// 获取榜单内容摘要

export const getRankList = async () => {
  const res = await netWork.get('/toplist/detail')
  let list = res.list.map(item => {
    const obj = {}
    obj.name = item.name
    obj.id = item.id
    obj.coverUrl = item.coverImgUrl
    obj.songs = item.tracks.map(item => {
      return {
        name: item.first,
        singer: item.second
      }
    })
    return obj
  })
  list = list.filter(item => item.songs.length > 0)
  return list
}
// 获取排行榜以及榜内每首歌曲具体信息 (除歌词, musicUrl)
export const getRankDetailToId = async (id) => {
  if (!id) return
  const obj = {}
  const detail = await getPlayDetail({ id })
  const target = detail.playlist
  obj.coverUrl = target.coverImgUrl
  obj.id = target.id
  obj.name = target.name
  obj.songs = target.tracks.map(song => {
    const id = song.id
    const name = song.name
    const picUrl = song.al.picUrl
    const singer = song.ar.map(it => it.name).join(' ')
    return {
      id,
      picUrl,
      name,
      singer
    }
  })
  return obj
}
// 获取歌手分类列表
export const getSingerCategory = async () => {
  // 获取 a - z 数组
  const category = [...getLetterChars()]
  const requests = []
  for (const key of category) {
    requests.push(getSingsToCategory(key))
  }
  let singerlist = await netWork.all(...requests)
  singerlist = singerlist.map(item => {
    return item.artists
  })
  const result = []
  for (let i = 0; i < category.length; i++) {
    const obj = {}
    let singers = {}
    const key = category[i]
    const currSingerList = singerlist[i]
    singers = currSingerList.map(item => {
      return {
        name: item.name,
        picUrl: item.img1v1Url,
        id: item.id
      }
    })
    obj.anchor = key
    obj.singers = singers
    result.push(obj)
  }
  // 增加热门
  const hotData = await getHotArtists({
    offset: 0,
    limit: 10
  })
  let hotList = hotData.artists
  hotList = hotList.map(song => {
    return {
      name: song.name,
      picUrl: song.img1v1Url,
      id: song.id
    }
  })
  result.unshift({
    anchor: '热',
    singers: hotList
  })
  return result

  // 根据字母获取对应的歌手数组
  function getSingsToCategory(initial) {
    return getArtistList({
      type: -1,
      area: -1,
      initial
    })
  }
}
// 根据歌手id获取对应的歌曲信息
export const getSongsToSingerId = async (id) => {
  const obj = {}
  const data = await getArtist({ id })
  obj.coverImgUrl = data.artist.picUrl
  obj.name = data.artist.name
  obj.songs = data.hotSongs
  // obj.songs.map(song=>{
  //   console.log(song)
  //   return{
  //     name:
  //   }
  // })
  return obj
}
