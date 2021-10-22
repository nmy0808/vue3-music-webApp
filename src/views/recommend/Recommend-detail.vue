<template>
  <div class='wrap global-bg'>
    <detail-cover :isFixed='isFixed' v-if='playlist' :pic='playlist.coverImgUrl' ref='coverRef'>
      <sub-header>
        {{ playlist && playlist.name }}
      </sub-header>
    </detail-cover>
    <!--    如果是专辑推荐列表 不显示图片-->
    <detail-list @scroll='onListScroll' v-if='playlist' :isPic='isPic' :list='playlist.tracks'
                 ref='scrollRef'></detail-list>
  </div>
</template>

<script>
// 推荐详情
import SubHeader from '@/components/header/sub-header'
import DetailCover from '@/components/cover/detail-cover'
import DetailList from '@/components-block/recommend/detail-list'
import { ref, watchEffect } from 'vue'
import { getAlbumDetail, getPlayDetail, getSongsToSingerId } from '@/api'
import { useRoute } from 'vue-router'

export default {
  name: 'Recommend-detail',
  components: {
    DetailList,
    DetailCover,
    SubHeader
  },
  setup() {
    const route = useRoute()
    const playlist = ref({})
    const coverRef = ref(null)
    const scrollRef = ref(null)
    const isFixed = ref(false)
    const isPic = ref(true)
    // 上面bar的高度
    const TOPBAR_HEIGHT = 44
    const onListScroll = ({ y }) => {
      if (!coverRef.value) return
      const pic = coverRef.value.picRef
      const height = scrollRef.value.$el.getBoundingClientRect().top
      const disTop = height + y
      const percent = 1 + (height - Math.abs(disTop)) / height
      pic.style.filter = `blur(${percent * 2}px)`
      // 如果达到上面bar的高度限制, bar浮起来的效果
      if (disTop <= TOPBAR_HEIGHT) {
        isFixed.value = true
      } else {
        isFixed.value = false
      }
      if (disTop >= height) {
        pic.style.transform = `scale(${2 - percent})`
        // 向下拉时将scroll的背景清除
        scrollRef.value.$el.style.background = 'rgba(0,0,0,0)'
        pic.style.filter = `blur(0px)`
      } else {
        scrollRef.value.$el.style.background = 'white'
      }
    }
    watchEffect(async () => {
      const id = route.params.id
      const type = route.params.type
      if (type === 'personalized') {
        const data = await getPlayDetail({ id })
        playlist.value = data.playlist
      }
      if (type === 'album') {
        isPic.value = false
        const data = await getAlbumDetail({ id })
        playlist.value = data.album
        playlist.value.coverImgUrl = data.album.blurPicUrl
        playlist.value.tracks = data.songs
      }
      if (type === 'singer') {
        isPic.value = true
        const data = await getSongsToSingerId(id)
        playlist.value.coverImgUrl = data.coverImgUrl
        playlist.value.name = data.name
        playlist.value.tracks = data.songs
      }
    })
    return {
      playlist,
      coverRef,
      onListScroll,
      scrollRef,
      isFixed,
      isPic
    }
  }
}
</script>

<style scoped lang='scss'>
.wrap {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 22;
}
</style>
