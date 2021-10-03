import { computed } from 'vue'
import { mapState, useStore, mapGetters, createNamespacedHelpers } from 'vuex'

export function useState(module, mapper) {
  let mapFn = mapState
  if (typeof module === 'string' && module.length > 0) {
    mapFn = createNamespacedHelpers(module).mapState
  } else {
    mapper = module
  }
  return useMapper(mapper, mapFn)
}

export function useGetters(module, mapper) {
  let mapFn = mapGetters
  if (typeof module === 'string' && module.length > 0) {
    mapFn = createNamespacedHelpers(module).mapGetters
  }
  return useMapper(mapper, mapFn)
}

function useMapper(mapper, mapFn) {
  const store = useStore()
  const storeState = {}
  const stateFns = mapFn(mapper)
  Object.entries(stateFns).forEach(([k, v]) => {
    storeState[k] = computed(v.bind({ $store: store }))
  })
  return storeState
}
