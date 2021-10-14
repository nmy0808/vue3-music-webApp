<template>
  <div class="form-group">
    <label :for="name">{{ label }}</label>
    <slot :state-class="inputClassName"></slot>
    <!--  is-invalid  -->
    <div class="invalid-feedback">{{ msg }}</div>
    <div class="valid-feedback">{{ msg }}</div>
  </div>
</template>

<script>
import { ref, inject, watch } from 'vue'
export default {
  props: ['label', 'name'],
  setup(props) {
    const form = inject('form')
    const validate = inject('validate')
    const msg = ref('')
    const inputClassName = ref('')
    const currentValidate = validate.find((it) => it.name === props.name)
    // stateType: 0失败 1成功
    // message: 报错消息
    const setState = (stateType, message) => {
      if (!stateType) {
        inputClassName.value = 'is-invalid'
        msg.value = message
      } else {
        inputClassName.value = 'is-valid'
        msg.value = message
      }
    }
    watch(
      () => form[props.name],
      (newVal) => {
        let rule = null
        if (currentValidate.required.data && newVal.trim() === '') {
          const msgTemp = currentValidate.required.msg
          return setState(0, msgTemp)
        } else if (currentValidate.rule) {
          rule = currentValidate.rule.data
          if (!rule.test(newVal)) {
            const msgTemp = currentValidate.rule.msg
            return setState(0, msgTemp)
          }
        }
        setState(1, '')
      }
    )
    return { msg, inputClassName }
  }
}
</script>
