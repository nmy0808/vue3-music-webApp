<template>
    <scroll class='scroll-wrap' @scroll='onscroll' probe-type='3'>
      <Banner class='banner-wrap' :banners='banners' v-if='banners.length>0' />
      <personalized :personalized='personalized'></personalized>
      <album :albums='albums' v-if='albums.length>0' />
      <new-song class='newsong-wrap' :new-song='newSong' v-if='newSong.length>0' />
    </scroll>
  <router-view></router-view>
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

export default {
  name: 'about.vue',
  emits: ['scroll'],
  components: {
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
    const { banners } = useBanner()
    const { personalized } = usePersonalized()
    const { albums } = useAlbum()
    const { newSong } = useNewSong()
    return {
      onscroll,
      banners,
      personalized,
      albums,
      newSong
    }
  }
}
</script>

<style scoped>
.scroll-wrap {
  position: fixed;
  top: 176px;
  bottom: 0;
  width: 100%;
}

.banner-wrap {
  padding-top: 32px;
}
.newsong-wrap{
  padding-bottom: 40px;
}
</style>
