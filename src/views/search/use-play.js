import { useStore } from 'vuex'
import { getSongDetail } from '@/api'
import { parseLyric } from '@/tool/indxe'

export default function() {
  const store = useStore()
  const setSongs = (songs) => {
    store.commit('setSongs', songs)
  }
  const setPlayState = (flag) => {
    store.commit('setPlayState', flag)
  }
  const setCurrentIndex = (index) => {
    store.commit('setCurrentIndex', index)
  }
  const setFullScreen = (flag) => {
    store.commit('setFullScreen', flag)
  }
  const getMusic = async (id) => {
    return await store.dispatch('getMusicNoEffect', id)
  }
  const getLyric = async (id) => {
    return await store.dispatch('getLyric', id)
  }
  const getSongDetailToId = async (id) => {
    setSongs([])
    const obj = {}
    const details = await getSongDetail({ ids: id })
    const musicUrl = await getMusic(id)
    const lyric = await getLyric(id)
    const song = details.songs[0]
    obj.name = song.name
    obj.id = song.id
    obj.singer = song.ar.map(item => item.name).join(' ') + ' - ' + song.al.name
    obj.picUrl = song.al.picUrl
    obj.musicUrl = musicUrl
    obj.lyric = parseLyric(lyric)
    setPlayState(false)
    setSongs([obj])
    setCurrentIndex(0)
    setFullScreen(true)
    setPlayState(true)
  }
  return {
    getSongDetailToId
  }
}
