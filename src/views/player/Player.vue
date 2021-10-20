<template>
  <transition :css='false' @enter='onEnter' @leave='onLeave'>
    <normal-player v-if='isFullScreen' :prevPlay='prevPlay' :nextPlay='nextPlay'></normal-player>
  </transition>
  <transition @enter='onMiniEnter' @leave='onMiniLeave'>
    <mini-player v-if='isMiniPlayer' :prevPlay='prevPlay' :nextPlay='nextPlay'></mini-player>
  </transition>
  <audio @canplay='onCanPlay' autoplay @timeupdate='onTimeUpdate' ref='audioRef' :src='currentSong.musicUrl'></audio>
</template>

<script>

import NormalPlayer from '@/components-block/player/normal-player'
import MiniPlayer from '@/components-block/player/mini-player'
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { gsap } from 'gsap'
import useSongDetail from '@/components-block/player/use-song-detail'
import usePlayer from './use-player'

export default {
  name: 'player',
  components: {
    MiniPlayer,
    NormalPlayer
  },
  setup() {
    const store = useStore()
    const isFullScreen = computed(() => store.getters.isFullScreen)
    const isMiniPlayer = computed(() => store.getters.isMiniPlayer)
    const onEnter = (el, done) => {
      gsap.fromTo(el, {
        y: '100%'
      }, {
        y: 0,
        duration: 0.3,
        force3D: true,
        onComplete: done
      })
    }
    const onLeave = (el, done) => {
      gsap.fromTo(el, {
        y: 0
      }, {
        y: '100%',
        duration: 0.3,
        force3D: true,
        onComplete: done
      })
    }
    const onMiniEnter = (el, done) => {
      const target = el.querySelector('.mini-wrap')
      gsap.fromTo(target, {
        y: '100%'
      }, {
        y: 0,
        delay: 0.1,
        duration: 0.3,
        force3D: true,
        onComplete: done
      })
    }
    const onMiniLeave = (el, done) => {
      const target = el.querySelector('.mini-wrap')
      gsap.fromTo(target, {
        y: 0
      }, {
        y: '100%',
        duration: 0.3,
        force3D: true,
        onComplete: done
      })
    }
    //
    const { currentSong } = useSongDetail()
    // audio 控制
    const audioRef = ref(null)
    const {
      prevPlay,
      nextPlay,
      onCanPlay,
      onTimeUpdate
    } = usePlayer({ audioRef })
    //

    //
    return {
      isFullScreen,
      isMiniPlayer,
      onEnter,
      onLeave,
      onMiniEnter,
      onMiniLeave,
      currentSong,
      audioRef,
      prevPlay,
      nextPlay,
      onCanPlay,
      onTimeUpdate
    }
  }
}
</script>

<style scoped>

</style>
