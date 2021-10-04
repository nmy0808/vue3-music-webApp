import { computed, nextTick, ref, watch } from 'vue'
import { useStore } from 'vuex'

export default function() {
  const cdImageRef = ref(null)
  const cdRef = ref(null)
  const store = useStore()
  const playing = computed(() => {
    return store.state.playing
  })
  watch(playing, (state) => {
    if (state) {
      nextTick(() => {
        cdImageRef.value.classList.add('playing')
      })
    } else {
      const cdImage = cdImageRef.value
      const cdWrap = cdRef.value
      syncTransform(cdWrap, cdImage)
      cdImage.classList.remove('playing')
    }
  })

  function syncTransform(wrap, img) {
    const imgCss = getComputedStyle(img).transform
    const wrapCss = getComputedStyle(wrap).transform
    if (wrapCss !== 'none') {
      wrap.style.transform = wrapCss.concat(' ', imgCss)
    } else {
      wrap.style.transform = imgCss
    }
  }

  return {
    cdRef,
    cdImageRef
  }
}
