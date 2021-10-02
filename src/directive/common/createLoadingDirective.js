import { createApp } from 'vue'

const RELATIVE_CLASS = 'g-relative'

export default function(comm) {
  let instanceKey
  return {
    mounted(el, binding) {
      instanceKey = comm.name
      if (!el[instanceKey]) {
        el[instanceKey] = {}
      }
      const instance = el[instanceKey] = createApp(comm).mount(document.createElement('div'))
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
    el.appendChild(el[instanceKey].$el)
  }

  function remove(el) {
    el.removeChild(el[instanceKey].$el)
    el.classList.remove(RELATIVE_CLASS)
  }
}
