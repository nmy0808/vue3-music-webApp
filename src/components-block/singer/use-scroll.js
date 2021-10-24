import { nextTick, ref, watch, onActivated } from 'vue'

export default function(props) {
  const scrollRef = ref(null)
  const singerRightWrap = ref(null)
  const currentIndex = ref(0)
  let isTouch = false //touch操作的时候 不要触发onScroll事件
  let scrollEl, normalAnchors, fixedAnchor, anchorTopArr, anchorHeight, rightAnchorWrap, rightAnchors, rightAnchorTopArr
  onActivated(() => {
    scrollRef.value.bsRef.refresh()
  })
  // init El
  watch(() => props.list, async () => {
    await nextTick()
    scrollEl = scrollRef.value.$el
    normalAnchors = Array.from(document.querySelectorAll('.singer-anchor'))
    anchorHeight = normalAnchors[0].clientHeight
    fixedAnchor = document.querySelector('.singer-flex-anchor')
    rightAnchorWrap = singerRightWrap.value
    rightAnchors = Array.from(document.querySelectorAll('.singer-right-anchor'))
    anchorTopArr = normalAnchors.map(el => {
      return el.offsetTop
    })
    rightAnchorTopArr = rightAnchors.map(el => {
      return el.getBoundingClientRect().y
    })
  })
  //
  const onScroll = ({ y }) => {
    if (isTouch) return
    let index = 0
    for (let i = 0; i < anchorTopArr.length; i++) {
      const currentTop = anchorTopArr[i]
      if (-currentTop >= y) {
        index = i
      } else {
        normalAnchors[i].style.display = 'flex'
      }
    }
    currentIndex.value = index

    const anchor = normalAnchors[currentIndex.value]
    const title = anchor.innerText
    fixedAnchor.innerHTML = title
    anchor.style.display = 'none'
  }
  const onTouchStart = (e) => {
    isTouch = true
    const y = e.touches[0].pageY
    let index = 0
    for (let i = 0; i < rightAnchorTopArr.length; i++) {
      const currentTop = rightAnchorTopArr[i]
      if (currentTop <= y) {
        index = i
      }
    }
    currentIndex.value = index
    const anchor = rightAnchors[currentIndex.value]
    const title = anchor.innerText
    fixedAnchor.innerHTML = title
    const targetTAnchor = normalAnchors.find(el => {
      return el.innerText === title
    })
    scrollRef.value.bsRef.scrollTo(0, -targetTAnchor.offsetTop, 200)
  }
  const onTouchMove = (e) => {
    isTouch = true
    const y = e.touches[0].pageY
    let index = 0
    for (let i = 0; i < rightAnchorTopArr.length; i++) {
      const currentTop = rightAnchorTopArr[i]
      if (currentTop <= y) {
        index = i
      }
    }
    currentIndex.value = index
    const anchor = rightAnchors[currentIndex.value]
    const title = anchor.innerText
    fixedAnchor.innerHTML = title
    const targetTAnchor = normalAnchors.find(el => {
      return el.innerText === title
    })
    scrollRef.value.bsRef.scrollTo(0, -targetTAnchor.offsetTop, 200)
  }
  const onTouchEnd = (e) => {
    setTimeout(() => {
      isTouch = false
    }, 200)
  }

  return {
    scrollRef,
    onScroll,
    singerRightWrap,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    currentIndex
  }
}
