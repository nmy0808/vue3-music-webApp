import { reactive, ref } from 'vue'

export default function() {
  const currentMiddleShow = ref('cover')
  const middleLeftStyle = reactive({})
  const middleRightStyle = reactive({})
  const touch = {}
  let current = 0 // 0:cover, 1:lyric
  const onMiddleTouchStart = (e) => {
    touch.x1 = e.touches[0].pageX
    touch.y1 = e.touches[0].pageY
  }
  const onMiddleTouchMove = (e) => {
    touch.x2 = e.touches[0].pageX
    touch.y2 = e.touches[0].pageY
    const disX = touch.x2 - touch.x1
    const disY = touch.y2 - touch.y1
    if (Math.abs(disY) > Math.abs(disX)) {
      return
    }
    const left = current === 0 ? 0 : -window.innerWidth
    let offsetWidth = left + disX
    if (offsetWidth > 0) {
      offsetWidth = 0
    }
    if (offsetWidth < -window.innerWidth) {
      offsetWidth = -window.innerWidth
    }
    const percent = Math.abs(offsetWidth / window.innerWidth)
    if (current === 0 && percent > 0.2) {
      currentMiddleShow.value = 'lyric'
    }
    if (current === 1 && percent < 0.8) {
      currentMiddleShow.value = 'cover'
    }
    middleLeftStyle.transform = `translate3d(${offsetWidth}px,0,0)`
  }
  const onMiddleTouchEnd = () => {
    if (currentMiddleShow.value === 'lyric') {
      middleLeftStyle.transform = `translate3d(${-window.innerWidth}px,0,0)`
      middleLeftStyle.transition = `all 0.5s`
      current = 1
    }
    if (currentMiddleShow.value === 'cover') {
      middleLeftStyle.transform = `translate3d(0px,0,0)`
      middleLeftStyle.transition = `all 0.5s`
      current = 0
    }
  }
  return {
    currentMiddleShow,
    onMiddleTouchStart,
    onMiddleTouchMove,
    onMiddleTouchEnd,
    middleLeftStyle,
    middleRightStyle
  }
}
