import { useStore } from 'vuex'

export default function() {
  const store = useStore()
  const onSelectPlay = (list, index) => {
    store.dispatch('selectPlay', {
      list,
      index
    })
  }
  const onRandomPlay = (list) => {
    store.dispatch('randomPlay', list)
  }
  return {
    onSelectPlay,
    onRandomPlay
  }
}
