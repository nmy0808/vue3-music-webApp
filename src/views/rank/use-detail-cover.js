import { ref } from 'vue'
import { onMounted } from '@vue/runtime-core'

export default function() {
  const picRef = ref(null)
  const navRef = ref(null)
  let picEl
  let navEl
  let picHeight
  let navHeight
  onMounted(() => {
    picEl = picRef.value
    navEl = navRef.value.$el
    picHeight = picEl.clientHeight
    navHeight = navEl.clientHeight
  })
  const onScroll = ({ y }) => {
    // 下拉放大
    if (y > 0) {
      picEl.style.transform = `scale(${(1 + y / picHeight)})`
    } else {
      let val = -y / picHeight
      picEl.style.transform = `scale(${1})`
      if (val > 1) {
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
    onScroll
  }
}
