import BScroll from '@better-scroll/core'
import Slide from '@better-scroll/slide'
import { onMounted, ref } from 'vue'

BScroll.use(Slide)

export default function(wrap) {
  const currentPage = ref(0)
  const slider = ref(null)
  onMounted(() => {
    slider.value = new BScroll(wrap.value, {
      scrollX: true,
      scrollY: false,
      slide: true,
      momentum: false,
      bounce: false,
      probeType: 3,
      eventPassthrough: 'vertical'
    })
    slider.value.on('slideWillChange', (page) => {
      currentPage.value = page.pageX
    })
  })
  return {
    slider,
    currentPage
  }
}
