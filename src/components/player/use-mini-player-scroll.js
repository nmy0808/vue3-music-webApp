import { computed, nextTick, onUnmounted, ref, watch } from 'vue'
import BScroll from '@better-scroll/core'
import Slide from '@better-scroll/slide'
import { useStore } from 'vuex'

BScroll.use(Slide)
export default function({
  isShow
}) {
  const store = useStore()
  const sliderWrapperRef = ref(null)
  const bScrollRef = ref(null)
  const currentIndex = computed(() => store.state.currentIndex)
  watch(isShow, async (state) => {
    await nextTick()
    if (!sliderWrapperRef.value) return
    if (state && !bScrollRef.value) {
      bScrollRef.value = new BScroll(sliderWrapperRef.value, {
        scrollX: true,
        scrollY: false,
        slide: {
          autoplay: false,
          loop: true
        },
        momentum: false,
        bounce: false
      })
      bScrollRef.value.goToPage(currentIndex.value, 0, 0)
    }
  })
  watch(currentIndex, (newCurrentIndex) => {
    if (bScrollRef.value && isShow) {
      window.bs = bScrollRef.value
      bScrollRef.value.goToPage(newCurrentIndex, 0, 0)
    }
  })
  watch(bScrollRef, (newBScrollRef) => {
    if (newBScrollRef) {
      newBScrollRef.on('slidePageChanged', ({ pageX }) => {
        store.commit('setCurrentIndex', pageX)
      })
    }
  })
  onUnmounted(() => {
    bScrollRef.value && bScrollRef.value.destroy()
  })
  return {
    sliderWrapperRef
  }
}
