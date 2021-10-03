import goodStorage from 'good-storage'

export function save(key, item, store) {
  const storage = get(key, []).slice()
  const index = storage.findIndex(it => it.id === item.id)
  if (index < 0) {
    storage.unshift(item)
  } else {
    storage.splice(index, 1)
    storage.unshift(item)
  }
  store.commit('setFavoriteList', storage)
  goodStorage.set(key, storage)
}

export function remove(key, item, store) {
  const storage = get(key, []).slice()
  const index = storage.findIndex(it => it.id === item.id)
  if (index >= 0) {
    storage.splice(index, 1)
  }
  store.commit('setFavoriteList', storage)
  goodStorage.set(key, storage)
}

export function get(key) {
  return goodStorage.get(key, [])
}
