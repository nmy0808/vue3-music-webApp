import { computed, onMounted, ref } from 'vue'

const ANCHOR_HEIGHT = 18
export default function(props, groupRef) {
  const scrollRef = ref(null)
  let list = []
  const shortcutsRef = computed(() => {
    return props.data.map(item => item.title)
  })
  onMounted(() => {
    list = groupRef.value.children
  })
  const touch = {}
  const onShortcutTouchStart = (e) => {
    const index = e.target.dataset.index
    if (typeof (+index) !== 'number') return
    touch.startY = e.touches[0].pageY
    touch.index = parseInt(index)
    const toEl = list[index]
    scrollRef.value.scrollRef.scrollToElement(toEl, 100, 0, 1)
  }
  const onShortcutTouchMove = (e) => {
    touch.endY = e.touches[0].pageY
    const newIndex = (-Math.floor((touch.startY - touch.endY) / ANCHOR_HEIGHT)) + touch.index
    if (newIndex >= list.length || newIndex < 0) return
    scrollRef.value.scrollRef.scrollToElement(list[newIndex], 100, 0, 1)
  }
  return {
    scrollRef,
    shortcutsRef,
    onShortcutTouchStart,
    onShortcutTouchMove
  }
}
