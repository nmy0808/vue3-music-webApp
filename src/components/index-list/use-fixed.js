import { nextTick, onMounted, ref, watch, computed } from 'vue'

const FIXED_HEIGHT = 30

export default function(props) {
  const groupRef = ref(null)
  const scrollYRef = ref(0)
  const currentIndexRef = ref(0)
  const currentTextRef = ref('')
  let heightList = []
  let list = []
  const fixedTitleStyleRef = computed(() => {
    let res = 0
    const currentY = -scrollYRef.value
    const distance = heightList[currentIndexRef.value + 1] - currentY
    if (distance > 0 && distance <= FIXED_HEIGHT) {
      res = distance - FIXED_HEIGHT
    }
    return {
      transform: `translateY(${res}px)`
    }
  })
  watch(() => props.data, () => {
    nextTick(() => {
      calcHeights()
    })
  })
  watch(scrollYRef, (newVal, oldVal) => {
    if (newVal === oldVal) return
    nextTick(() => {
      for (let i = 0; i < heightList.length; i++) {
        const pre = heightList[i]
        const next = heightList[i + 1]
        const scrollYVal = -scrollYRef.value
        if (scrollYVal >= pre && scrollYVal <= next) {
          currentIndexRef.value = i
          currentTextRef.value = list[i].dataset.title
          break
        }
      }
    })
    if (scrollYRef.value > 0) {
      currentTextRef.value = ''
    }
  })
  onMounted(() => {
    list = groupRef.value.children
  })

  function calcHeights() {
    heightList = []
    let height = 0
    heightList.push(height)
    for (let i = 0; i < list.length; i++) {
      const item = list[i]
      height += item.clientHeight
      heightList.push(height)
    }
  }

  function onFixedScroll(position) {
    scrollYRef.value = position.y
  }

  return {
    groupRef,
    onFixedScroll,
    currentIndexRef,
    currentTextRef,
    fixedTitleStyleRef
  }
}
