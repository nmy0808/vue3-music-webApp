import { computed, onMounted, ref, reactive, watch } from 'vue'

const progressBtnWidth = 16

export default function(props, emit) {
  // watch(() => props.progress, (c) => {
  //   console.log(c)
  // })
  const proWrapRef = ref(null)
  let proWrapWidth = 0
  const offset = ref(0)
  const touch = reactive({})
  //
  onMounted(() => {
    proWrapWidth = proWrapRef.value.clientWidth
  })
  //
  watch(() => props.progress, () => {
    offset.value = (proWrapWidth - progressBtnWidth) * props.progress
  })
  // const offset = computed(() => {
  //   return (proWrapWidth - progressBtnWidth) * props.progress
  // })
  const btnStyle = computed(() => {
    let val = offset.value
    if (val > proWrapWidth - progressBtnWidth) {
      val = proWrapWidth - progressBtnWidth / 2
    }
    if (val < 0) {
      val = 0
    }
    return `transform: translate3d(${val}px,0,0)`
  })
  const progressStyle = computed(() => {
    let val = offset.value
    if (val > proWrapWidth - progressBtnWidth) {
      val = proWrapWidth - progressBtnWidth / 2
    }
    if (val < 0) {
      val = 0
    }
    return `width:${val}px`
  })
  const onTouchStart = (e) => {
    const disx = e.touches[0].pageX - proWrapRef.value.getBoundingClientRect().x
    touch.x1 = disx
  }
  const onTouchMove = (e) => {
    const disx = e.touches[0].pageX - proWrapRef.value.getBoundingClientRect().x
    touch.x2 = disx - touch.x1
    offset.value = Math.min(proWrapWidth, Math.max(touch.x1 + touch.x2, 0))
    emit('progress-changing', {
      offset: offset.value,
      proWrapWidth: proWrapWidth
    })
  }
  const onTouchEnd = (e) => {
    emit('progress-changed', {
      offset: offset.value,
      proWrapWidth: proWrapWidth
    })
  }
  return {
    proWrapRef,
    offset,
    btnStyle,
    progressStyle,
    onTouchStart,
    onTouchMove,
    onTouchEnd
  }
}
