<template>
  <scroll class='scroll-wrapper' v-loading:[loadingText]='isLoading'>
    <div>
      <div class='slider-wrapper'>
        <slider v-if='sliders.length' :sliders='sliders' />
      </div>
      <h2 v-show='!isLoading' class='list-title'>热门歌单推荐</h2>
      <ul class='list-wrapper'>
        <li class='list-group' v-for='item in albums' :key='item.id'>
          <div class='list-cover'>
            <img v-lazy='item.pic'>
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

export default {
  components: {
    slider
  },
  data() {
    return {
      sliders: [],
      albums: [],
      loadingText: '请稍等..'
    }
  },
  computed: {
    isLoading() {
      return this.sliders.length === 0 && this.albums.length === 0
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
  height: 60px;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
}

.scroll-wrapper {
  width: 100%;
  position: absolute;
  top: 88px;
  bottom: 0;
  overflow: hidden;
}

.slider-wrapper {
  height: 150px;
}

.list-wrapper {
  .list-group {
    display: flex;
    padding:  0 20px 20px 20px;

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
