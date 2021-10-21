<template>
  <scroll class='scroll-wrap' @scroll='onscroll' probe-type='3' v-load='isLoading'>
    <div v-if='!isLoading'>
      <Banner class='banner-wrap' :banners='banners' v-if='banners.length>0' />
      <personalized :personalized='personalized'
                    @to-page='onToPageDetail($event,"personalized")'></personalized>
      <album :albums='albums' v-if='albums.length>0' @to-page='onToPageDetail($event,"album")' />
      <new-song class='newsong-wrap' :new-song='newSong' v-if='newSong.length>0' />
      <mini-player-box></mini-player-box>
    </div>
  </scroll>
  <router-view v-slot='{ Component }'>
    <transition name='slide'>
      <component :is='Component' />
    </transition>
  </router-view>
</template>

<script>

import Banner from '@/components/banner/banner'
import Personalized from '@/components-block/recommend/personalized'
import Album from '@/components-block/recommend/album'
import useBanner from './use-banner'
import usePersonalized from './use-personalized'
import useAlbum from './use-album'
import useNewSong from './use-newSong'
import NewSong from '@/components-block/recommend/newSong'
import Scroll from '@/components/scroll/scroll'
import { useRouter } from 'vue-router'
import MiniPlayerBox from '@/components/mini-player-box/mini-player-box'
import { computed } from 'vue'

export default {
  name: 'about.vue',
  emits: ['scroll'],
  components: {
    MiniPlayerBox,
    Scroll,
    NewSong,
    Personalized,
    Album,
    Banner
  },
  setup(props, { emit }) {
    // navigation 滑动动效
    const onscroll = (e) => {
      emit('scroll', e)
    }
    const router = useRouter()
    const onToPageDetail = (id, type) => {
      router.push({
        name: 'RecommendDetail',
        params: {
          id,
          type
        }
      })
    }
    const { banners } = useBanner()
    const { personalized } = usePersonalized()
    const { albums } = useAlbum()
    const { newSong } = useNewSong()
    const isLoading = computed(() => {
      const res = banners.value.length > 0 && personalized.value.length > 0 && albums.value.length > 0 && newSong.value.length > 0
      return !res
    })
    return {
      onscroll,
      banners,
      personalized,
      albums,
      newSong,
      onToPageDetail,
      isLoading
    }
  }
}
</script>

<style scoped lang='scss'>
.scroll-wrap {
  position: fixed;
  top: 176px;
  bottom: 0;
  width: 100%;
}

.banner-wrap {
  padding-top: 32px;
}

.newsong-wrap {
  padding-bottom: 40px;
}
</style>
