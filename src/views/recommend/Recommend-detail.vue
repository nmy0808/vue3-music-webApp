<template>
  <div class='wrap'>
    <detail-cover :isFixed='isFixed' v-if='playlist' :pic='playlist.coverImgUrl' ref='coverRef'>
      <sub-header>
        {{ playlist && playlist.name }}
      </sub-header>
    </detail-cover>
    <detail-list @scroll='onListScroll' v-if='playlist' :list='playlist.tracks' ref='scrollRef'></detail-list>
  </div>
</template>

<script>
// 推荐详情
import SubHeader from '@/components/header/sub-header'
import DetailCover from '@/components/cover/detail-cover'
import DetailList from '@/components-block/recommend/detail-list'
import { ref, watchEffect } from 'vue'
import { getPlayDetail } from '@/api'
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
    const playlist = ref(null)
    const coverRef = ref(null)
    const scrollRef = ref(null)
    const isFixed = ref(false)
    // 上面bar的高度
    const TOPBAR_HEIGHT = 44
    const onListScroll = ({ y }) => {
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
      const data = await getPlayDetail({ id })
      playlist.value = data.playlist
    })
    return {
      playlist,
      coverRef,
      onListScroll,
      scrollRef,
      isFixed
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
