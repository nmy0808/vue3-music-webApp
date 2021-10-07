import { gsap } from 'gsap'
import { reactive } from 'vue'

export default function() {
  let style = {
    x: 0,
    y: 0,
    scale: 1,
    opacity: 1
  }
  const cdWrapStyle = reactive({})

  const onEnter = (el, done) => {
    from(done)
  }
  const onAfterEnter = () => {
  }
  const onLeave = (el, done) => {
    to(done)
  }
  const onAfterLeave = () => {
  }

  function clearStyle() {
    style = {
      x: 0,
      y: 0,
      scale: 1,
      opacity: 1
    }
  }

  function to(done) {
    gsap.to(style, {
      x: -170,
      y: 527,
      scale: 0.1,
      opacity: 0,
      duration: 0.5,
      onUpdate: () => {
        cdWrapStyle.transform = `translate3d(${style.x}px,${style.y}px,0) scale(${style.scale})`
        cdWrapStyle.opacity = style.opacity
      },
      onComplete: () => {
        clearStyle()
        done()
      }
    })
  }

  function from(done) {
    gsap.from(style, {
      x: -170,
      y: 527,
      scale: 0.1,
      opacity: 0,
      duration: 0.5,
      onUpdate: () => {
        cdWrapStyle.transform = `translate3d(${style.x}px,${style.y}px,0) scale(${style.scale})`
        cdWrapStyle.opacity = style.opacity
      },
      onComplete: () => {
        clearStyle()
        done()
      }
    })
  }

  return {
    cdWrapStyle,
    onEnter,
    onAfterEnter,
    onLeave,
    onAfterLeave
  }
}
