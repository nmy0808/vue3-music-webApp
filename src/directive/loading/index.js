import loading from './loading'
import { createApp } from 'vue'

export default {
  mounted(el, binding) {
    const app = createApp(loading)
    const instance = app.mount(document.createElement('div'))
    el.instance = instance
    if (binding.value) {
      addEl(el)
    }
  },
  updated(el, binding) {
    if (binding.value !== binding.oldValue) {
      binding.value ? addEl(el) : removeEl(el)
    }
  }
}

function addEl(el) {
  if (!judgePositionStyle(el)) {
    addClass(el, 'g-relative')
  }
  el.appendChild(el.instance.$el)
  el.instance.isShow = true
}

function removeEl(el) {
  if (judgePositionStyle(el)) {
    removeClass(el, 'g-relative')
  }
  el.instance.isShow = false
  el.removeChild(el.instance.$el)
}

function judgePositionStyle(el) {
  const keywords = ['fixed', 'absolute', 'relative']
  const style = getComputedStyle(el)
  return keywords.includes(style.position)
}

function addClass(el, claName) {
  el.classList.add(claName)
}

function removeClass(el, claName) {
  el.classList.remove(claName)
}
