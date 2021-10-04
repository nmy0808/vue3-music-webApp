import { computed, onMounted, ref, watch } from 'vue'
const progressBtnWidth = 16

export default function(props) {
  // watch(() => props.progress, (c) => {
  //   console.log(c)
  // })
  const proWrapRef = ref(null)
  let proWrapWidth = 0
  //
  onMounted(() => {
    proWrapWidth = proWrapRef.value.clientWidth
  })
  //
  const offset = computed(() => {
    return (proWrapWidth - progressBtnWidth) * props.progress
  })
  const btnStyle = computed(() => {
    return `transform: translate3d(${offset.value}px,0,0)`
  })
  const progressStyle = computed(() => {
    return `width:${offset.value}px`
  })
  return {
    proWrapRef,
    offset,
    btnStyle,
    progressStyle
  }
}
