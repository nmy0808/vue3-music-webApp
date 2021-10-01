<template>
  <scroll class='scroll-wrapper'>
    <div>
      <div class='slider-wrapper'>
        <slider v-if='sliders.length' :sliders='sliders' />
      </div>
      <h1 class='list-title'>热门歌单推荐</h1>
      <ul class='list-wrapper'>
        <li class='list-group' v-for='item in albums' :key='item.id'>
          <div class='list-cover'>
            <img :src='item.pic'>
          </div>
          <div class='list-info'>
            <div class='name'>{{ item.username }}</div>
            <div class='title'>{{ item.title }}</div>
          </div>
        </li>
      </ul>
    </div>
  </scroll>
</template>

<script>

import { getRecommend } from '../service/recommend'
import slider from '@/components/base/slider/slider'
import scroll from '@/components/base/scroll/scroll'

export default {
  components: {
    slider,
    scroll
  },
  data() {
    return {
      sliders: [],
      albums: []
    }
  },
  async created() {
    const res = await getRecommend()
    this.sliders = res.sliders
    this.albums = res.albums
  }
}
</script>

<style scoped lang='scss'>
.list-title {
  font-size: $font-size-medium;
  color: $color-theme;
  text-align: center;
  height: 65px;
  line-height: 65px;
}

.scroll-wrapper {
  height: calc(100vh - 65px);
  overflow: hidden;
}

.list-wrapper {
  .list-group {
    display: flex;
    padding: 20px 0 20px 20px;

    .list-cover {
      width: 60px;
      height: 60px;
      padding-right: 20px;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .list-info {
      font-size: $font-size-medium;

      .name {
        color: $color-text;
        margin-top: 10px;
        margin-bottom: 10px;
      }

      .title {
        color: $color-text-d;
      }
    }
  }
}
</style>
