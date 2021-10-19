<template>
  <div>
    <recommend-title class='title-wrap'>最新音乐</recommend-title>
    <ul class='list container'>
      <li class='item' v-for='item in newSong' :key='item.id' @click='onSelectItem(item)'>
        <div class='pic'>
          <img v-lazy='item.picUrl' alt=''>
        </div>
        <div class='desc'>
          <h4 class='name'>{{ item.name }}</h4>
          <h4 class='singer'>{{ item.songs.artists[0].name }}</h4>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import RecommendTitle from '@/components/title/recommend-title'
import { useStore } from 'vuex'

export default {
  name: 'newSong',
  components: { RecommendTitle },
  props: ['newSong'],
  setup(props) {
    const store = useStore()
    const onSelectItem = async (item) => {
      await store.dispatch('getSongDetail', item.id)
      store.commit('setFullScreen', true)
    }
    return { onSelectItem }
  }
}
</script>

<style scoped lang='scss'>
.title-wrap {
  margin-top: 60px;
}

.list {

  .item {
    display: flex;
    justify-content: space-between;
    margin-top: 32px;

    .pic {
      width: 120px;
      height: 120px;
      margin-right: 32px;
      border-radius: 30px;
      overflow: hidden;
      box-shadow: 0px 12px 18px 0px rgba(22, 33, 42, 0.5);

      img {
        width: 100%;
        height: 100%;
      }
    }

    .desc {
      height: 120px;
      margin-right: auto;
      display: flex;
      flex-direction: column;
      justify-content: center;

      h4 {
        margin: 6px 0;

        &.name {
          color: $color-light;
          font-size: $font-size-medium;
        }

        &.singer {
          color: $color-sub;
          font-size: $font-size-medium;
        }
      }
    }
  }
}
</style>
