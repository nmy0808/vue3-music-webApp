import { ref } from 'vue'

export default function() {
  const isShadow = ref(false)
  const nav = ref(null)
  const top = ref(0)
  const isBgClass = ref(false)
  const onscroll = ({ y }) => {
    let topTemp = y
    if (topTemp <= -44) {
      topTemp = -44
      isBgClass.value = true
      isShadow.value = true
    } else {
      isShadow.value = false
      isBgClass.value = false
    }
    top.value = topTemp
  }
  return {
    onscroll,
    isShadow,
    top,
    nav,
    isBgClass
  }
}
