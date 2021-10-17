<template>
  <transition :css='false' @enter='onEnter' @leave='onLeave'>
    <normal-player v-if='isFullScreen'></normal-player>
  </transition>
  <transition @enter='onMiniEnter' @leave='onMiniLeave'>
    <mini-player v-if='isMiniPlayer'></mini-player>
  </transition>
</template>

<script>

import NormalPlayer from '@/components-block/player/normal-player'
import MiniPlayer from '@/components-block/player/mini-player'
import { computed } from 'vue'
import { useStore } from 'vuex'
import { gsap } from 'gsap'

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
    return {
      isFullScreen,
      isMiniPlayer,
      onEnter,
      onLeave,
      onMiniEnter,
      onMiniLeave
    }
  }
}
</script>

<style scoped>

</style>
