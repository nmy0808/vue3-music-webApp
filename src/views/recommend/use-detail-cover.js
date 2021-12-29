import { ref, onMounted } from 'vue'

export default function() {
  const picRef = ref(null)
  const navRef = ref(null)
  const scrollRef = ref(null)
  let picEl
  let navEl
  let picHeight
  let navHeight
  onMounted(() => {
    picEl = picRef.value.picRef.parentNode
    navEl = navRef.value.$el
    // picHeight = picEl.clientHeight
    picHeight = scrollRef.value.$el.getBoundingClientRect().y
    navHeight = navEl.clientHeight
  })
  const onScroll = ({ y }) => {
    // 下拉放大
    if (y > 0) {
      picEl.style.transform = `scale(${1 + y / picHeight})`
    } else {
      picEl.style.transform = `scale(${1})`
      let val = -y / picHeight
      if (val > 1.2) {
        val = 1
      }
      picEl.style.filter = `sepia(${val})`
    }
    // 判断nav
    if (y <= -(picHeight - navHeight)) {
      navEl.classList.add('fixed')
      picEl.classList.add('fixed')
    } else {
      navEl.classList.remove('fixed')
      picEl.classList.remove('fixed')
    }
  }
  return {
    picRef,
    navRef,
    onScroll,
    scrollRef
  }
}
