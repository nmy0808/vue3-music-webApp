import { onMounted, ref, watch } from 'vue'

const HEADER_HEIGHT = 40
const COVER_HEIGHT = 262
export default function() {
  const scrollRef = ref(null)
  const headerRef = ref(null)
  const scrollYRef = ref(0)
  let filterEl, coverEl
  const onListScroll = (e) => {
    scrollYRef.value = e.y
  }
  onMounted(() => {
    filterEl = headerRef.value.querySelector('.filter')
    coverEl = headerRef.value.querySelector('.cover')
  })
  watch(scrollYRef, (scrollY) => {
    // 如果滑到顶部极限距离, 导航样式变化 防止快速滑动+4误差
    if (COVER_HEIGHT + scrollY <= HEADER_HEIGHT + 4) {
      headerRef.value.classList.add('small-show')
    } else {
      headerRef.value.classList.remove('small-show')
    }
    // 如果下拉
    if (scrollY > 0) {
      const scale = 1 + scrollY / COVER_HEIGHT
      coverEl.style.transform = `scale3d(${scale},${scale},1)`
      const alpha = -scrollY / COVER_HEIGHT + 0.4
      filterEl.style.background = `rgba(0, 0, 0, ${alpha})`
    } else if (-scrollY < COVER_HEIGHT) {
      // 如果上滑
      const blur = (-scrollY / COVER_HEIGHT) * 10
      coverEl.style.filter = `blur(${blur}px)`
    }
  })

  return {
    scrollRef,
    headerRef,
    onListScroll
  }
}
