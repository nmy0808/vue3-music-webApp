import { getLyric, getMusic, getSongDetail } from '@/api'

export default {
  async getSongDetail({
    commit,
    dispatch
  }, ids) {
    if (Array.isArray(ids)) {
      ids = ids.join(',')
    }
    const details = await getSongDetail({ ids })
    const { songs } = details
    const result = []
    for (const song of songs) {
      const obj = {}
      obj.name = song.name
      obj.id = song.id
      obj.picUrl = song.al.picUrl
      obj.singer = ''
      // 歌手信息
      const { ar } = song
      ar.forEach(item => {
        obj.singer += (' ' + item.name)
      })
      // 歌词
      // const lyricRes = await getLyric({ id: obj.id })
      // obj.lyric = lyricRes.lrc.lyric
      // 歌曲url
      const musicUrl = await getMusic({ id: obj.id })
      obj.musicUrl = musicUrl.data[0].url
      result.push(obj)
    }
    if (ids.length > 1) {
      commit('setSongs', result)
    } else {
      commit('setSong', ...result)
    }
  },
  async getLyric({
    state,
    commit
  }, id) {
    if (state.songs.length > 0) {
      const targetSong = state.songs.find(song => song.id === id)
      if (targetSong.lyric) {
        return
      }
    }
    const lyricRes = await getLyric({ id })
    const lyric = lyricRes.lrc.lyric
    commit('setCurrentLyric', lyric)
    commit('setLyric', {
      id,
      lyric
    })
    return lyric
  },
  async getMusicUrl({
    state,
    commit
  }, id) {
    if (!id) return
    const targetSong = state.songs.find(song => song.id === id) || {}
    if (targetSong.musicUrl) {
      return
    }
    const musicUrl = await getMusic({ id })
    targetSong.musicUrl = musicUrl.data[0].url
  },
  // 只是单纯的获取music的url地址
  async getMusicNoEffect({
    state,
    commit
  }, id) {
    if (!id) return
    const musicUrl = await getMusic({ id })
    return musicUrl.data[0].url
  }
}
