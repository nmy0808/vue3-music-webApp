import { reactive, ref } from 'vue'

export default function() {
  const currentMiddleShow = ref('cover')
  const middleLeftStyle = reactive({})
  const middleRightStyle = reactive({})
  const touch = {}
  let currentMiddleView = 'cover' // cover/lyric
  const onMiddleTouchStart = (e) => {
    touch.x1 = e.touches[0].pageX
    touch.y1 = e.touches[0].pageY
  }
  const onMiddleTouchMove = (e) => {
    touch.x2 = e.touches[0].pageX
    touch.y2 = e.touches[0].pageY
    let disX = touch.x2 - touch.x1
    const disY = touch.y2 - touch.y1
    if (Math.abs(disY) > Math.abs(disX)) {
      return
    }
    if (disX > 0 && currentMiddleView === 'cover') {
      disX = 0
    }
    if (disX < 0 && currentMiddleView === 'lyric') {
      disX = 0
    }
    const offsetWidth = (currentMiddleView === 'cover' ? 0 : -window.innerWidth) + disX
    let percent = Math.abs(offsetWidth / window.innerWidth)
    if (percent > 1) {
      percent = 1
    }
    if (percent < 0) {
      percent = 0
    }
    if (currentMiddleView === 'cover') {
      if (percent > 0.2) {
        currentMiddleShow.value = 'lyric'
      } else {
        currentMiddleShow.value = 'cover'
      }
    } else {
      if (percent < 0.8) {
        currentMiddleShow.value = 'cover'
      } else {
        currentMiddleShow.value = 'lyric'
      }
    }
    middleLeftStyle.opacity = 1 - percent
    middleRightStyle.transform = `translate3d(${offsetWidth}px,0,0)`
  }
  const onMiddleTouchEnd = () => {
    if (currentMiddleShow.value === 'cover') {
      middleLeftStyle.opacity = 1
      middleLeftStyle.transition = `all 0.3`
      middleRightStyle.transform = `translate3d(0px,0,0)`
      middleRightStyle.transition = `all 0.3`
      currentMiddleView = 'cover'
    } else {
      middleLeftStyle.opacity = 0
      middleLeftStyle.transition = `all 0.8`
      middleRightStyle.transform = `translate3d(${-window.innerWidth}px,0,0)`
      middleRightStyle.transition = `all 0.8`
      currentMiddleView = 'lyric'
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
