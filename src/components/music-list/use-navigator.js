import { computed } from 'vue'

export default function(props) {
  const calcCoverStyleRef = computed(() => {
    return {
      backgroundImage: `url(${props.singer.pic})`
    }
  })
  return {
    calcCoverStyleRef
  }
}
