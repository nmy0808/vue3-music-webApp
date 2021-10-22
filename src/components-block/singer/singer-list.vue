<template>
  <div class='singer-list-wrap'>
    <div class='singer-item' v-for='item in list' :key='item.anchor'>
      <div class='singer-anchor container'>{{ item.anchor }}</div>
      <div class='container'>
        <user-list :list='item.singers' @select='onSelectItem'></user-list>
      </div>
    </div>
    <div class='singer-flex-anchor container'>我是fixed锚点</div>
  </div>
</template>

<script>
import UserList from '@/components-block/user/user-list'

export default {
  name: 'singer-list',
  components: { UserList },
  props: ['list'],
  emits: ['select'],
  setup(props, { emit }) {
    const onSelectItem = (id) => {
      emit('select', id)
    }
    return { onSelectItem }
  }
}
</script>

<style scoped lang='scss'>
.singer-list-wrap {
  .singer-item {
    width: 750px;

    .singer-anchor {
      width: 750px;
      height: 60px;
      background: #000;
      display: flex;
      align-items: center;
      background: #44515A;
      color: #BDBDBD;
    }
  }
}
</style>
