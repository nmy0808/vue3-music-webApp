<template>
  <form ref="formRef">
    <slot></slot>
  </form>
</template>

<script>
import { ref } from 'vue'
import { onMounted, provide } from '@vue/runtime-core'
export default {
  props: ['form', 'validate'],
  setup(props) {
    provide('form', props.form)
    provide('validate', props.validate)
    const formRef = ref(null)
    onMounted(() => {
      formRef.value.querySelectorAll('button').forEach((element) => {
        element.addEventListener('click', (e) => {
          e.preventDefault()
        })
      })
    })
    return { formRef }
  }
}
</script>

<style scoped lang="scss">
.form-group {
  height: 93px;
}
</style>
