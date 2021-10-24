import { ref, watch, watchEffect } from 'vue'
import { useRoute } from 'vue-router'

export default function() {
  const route = useRoute()
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
  // 切换路由时顶部top为0
  watch(route, (val) => {
    if (!val.path.includes('/recommend')) {
      top.value = 0
      isShadow.value = false
      isBgClass.value = false
    }
  }, { deep: true })
  return {
    onscroll,
    isShadow,
    top,
    nav,
    isBgClass
  }
}
