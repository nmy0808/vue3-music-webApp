import Loading from '@/components/base/loading/loading'
import { createApp } from 'vue'

const RELATIVE_CLASS = 'g-relative'

export default {
  mounted(el, binding) {
    const instance = el.instance = createApp(Loading).mount(document.createElement('div'))
    binding.arg && instance.setMessage(binding.arg)
    if (binding.value) {
      append(el)
    }
  },
  updated(el, {
    value,
    oldValue
  }) {
    if (oldValue !== value) {
      value ? append(el) : remove(el)
    }
  }
}

function append(el) {
  const style = getComputedStyle(el)
  if (['absolute', 'fixed', 'relative'].indexOf(style.position) === -1) {
    el.classList.add(RELATIVE_CLASS)
  }
  el.appendChild(el.instance.$el)
}

function remove(el) {
  el.removeChild(el.instance.$el)
  el.classList.remove(RELATIVE_CLASS)
}
