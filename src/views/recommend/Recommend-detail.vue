<template>
  <div class='wrap global-bg'>
    <detail-cover :isFixed='isFixed' @img-load='onImgLoad' :pic='playlist.coverImgUrl' ref='picRef'>
      <sub-header class='sub-header' ref='navRef'>
        {{ playlist && playlist.name }}
      </sub-header>
    </detail-cover>
    <!--    如果是专辑推荐列表 不显示图片-->
    <detail-list @scroll='onScroll' v-if='playlist' :isPic='isPic' :list='playlist.tracks'
                 ref='scrollRef'></detail-list>
    <div class='detail-mask' ref='maskRef'>
      <div class='detail-mask-inner' v-load='!isPicLoad'>

      </div>
    </div>
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
import useDetailCover from './use-detail-cover'

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
    const isFixed = ref(false)
    const isPic = ref(true)
    const maskRef = ref(null)
    // 封面加载完
    const isPicLoad = ref(false)
    const onImgLoad = () => {
      isPicLoad.value = true
      setTimeout(() => {
        maskRef.value && maskRef.value.classList.add('hide')
      })
    }
    //
    const {
      onScroll,
      picRef,
      navRef,
      scrollRef
    } = useDetailCover()
    // 上面bar的高度
    // const TOPBAR_HEIGHT = 44
    // const onListScroll = ({ y }) => {
    //   if (!coverRef.value) return
    //   const pic = coverRef.value.picRef
    //   const height = scrollRef.value.$el.getBoundingClientRect().top
    //   const disTop = height + y
    //   const percent = 1 + (height - Math.abs(disTop)) / height
    //   let sepia = percent
    //   if (sepia > 1) {
    //     sepia = 1
    //   }
    //   pic.style.filter = `sepia(${sepia / 0.3})`
    //   // 如果达到上面bar的高度限制, bar浮起来的效果
    //   if (disTop <= TOPBAR_HEIGHT) {
    //     isFixed.value = true
    //   } else {
    //     isFixed.value = false
    //   }
    //   if (disTop >= height) {
    //     pic.style.transform = `scale(${2 - percent})`
    //     // 向下拉时将scroll的背景清除
    //     scrollRef.value.$el.style.background = 'rgba(0,0,0,0)'
    //     pic.style.filter = `sepia(0)`
    //   } else {
    //     scrollRef.value.$el.style.background = 'white'
    //   }
    // }
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
      // onListScroll,
      //
      onScroll,
      picRef,
      navRef,
      //
      scrollRef,
      isFixed,
      isPic,
      isPicLoad,
      onImgLoad,
      maskRef
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

.sub-header {
  z-index: 20;

  .fixed {
    position: fixed;
    left: -1px;
    right: 0;
    height: 88px;
    z-index: 20;
  }
}

.detail-mask {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2;
  @extend .global-bg;

  &.hide {
    display: none;
  }

  .detail-mask-inner {
    width: 100%;
    margin-top: 100px;
    height: calc(100% - 100px);
  }

  .loading-wrap {
    margin-top: 100px;
    box-sizing: border-box;
  }
}
</style>
