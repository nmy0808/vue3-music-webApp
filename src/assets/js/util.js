export function shuffle(source) {
  const arr = source.slice()
  for (let i = 0; i < arr.length; i++) {
    const j = getRandomInt(i)
    swap(arr, i, j)
  }
  return arr
}

function getRandomInt(max) {
  return Math.floor(Math.random() * (max + 1))
}

function swap(arr, i, j) {
  const t = arr[i]
  arr[i] = arr[j]
  arr[j] = t
}

export function formatTime(interval) {
  interval = interval | 0
  const minute = ((interval / 60 | 0) + '').padStart(2, '0')
  const second = (interval % 60 + '').padStart(2, '0')
  return `${minute}:${second}`
}

export function throttle(fn, interval = 5000) {
  // let timer = null
  let preTime = Date.now()
  return function(...arg) {
    const curTime = Date.now()
    if (curTime - preTime < interval) return
    preTime = curTime
    fn.apply(null, arg)
    // clearTimeout(timer)
    // timer = setTimeout(() => {
    //   fn.apply(null, arg)
    // }, interval)
  }
}
