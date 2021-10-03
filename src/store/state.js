import { PLAY_MODE } from '@/assets/js/constant'

export default {
  // 序列歌单
  sequenceList: [],
  // 随机歌单
  playlist: [],
  // 正在播放
  playing: false,
  // 播放顺序
  playMode: PLAY_MODE.sequence,
  // 当前索引
  currentIndex: 0,
  // 全屏
  fullScreen: false,
  // 收藏列表
  favoriteList: []
}
