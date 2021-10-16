<template>
  <div class='wrap  '>
    <recommend-title class='title'>最新专辑</recommend-title>
    <div class='scroll-wrap' ref='wrap'>
      <ul class='list'>
        <li class='item' @click='onToPage(item.id)' v-for='item in albums' :key='item.id'>
          <div class='pic'>
            <img v-lazy='item.picUrl'>
          </div>
          <div class='desc'>
            <h4 class='name'>
              {{ item.name }}
            </h4>
            <h4 class='singer'>
              {{ item.artist.trans }}
            </h4>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import RecommendTitle from '@/components/title/recommend-title'
import BScroll from '@better-scroll/core'
import ObserveDOM from '@better-scroll/observe-dom'

import { ref, onMounted } from 'vue'

BScroll.use(ObserveDOM)

// 最新专辑
export default {
  name: 'album',
  props: ['albums'],
  emits: ['toPage'],
  components: {
    RecommendTitle
  },
  setup(props, { emit }) {
    const wrap = ref(null)
    const onToPage = (id) => {
      emit('toPage', id)
    }
    onMounted(() => {
      const list = wrap.value.querySelector('.list')
      const items = wrap.value.querySelectorAll('.item')
      list.style.width = items.length * [...items][0].clientWidth + 'px'
      // eslint-disable-next-line no-new
      new BScroll(wrap.value, {
        observeDOM: true,
        scrollX: true,
        scrollY: false,
        click: true,
        bounce: false
      })
    })
    return {
      wrap,
      onToPage
    }
  }
}
</script>

<style scoped lang='scss'>
.wrap {
  padding-top: 28px;
}

.scroll-box {
  width: 100vw;
}

.list {
  display: flex;
  padding-top: 32px;

  .item {
    flex-shrink: 0;
    width: 260px;
    padding-left: 32px;
    box-sizing: content-box;

    .pic {
      width: 260px;
      height: 260px;
      border-radius: 42px;
      overflow: hidden;
      box-shadow: 0px 12px 18px 0px rgba(22, 33, 42, 0.5);

      img {
        width: 100%;
        height: 100%;
      }
    }

    .desc {
      font-size: $font-size-medium;

      .name {
        color: $color-light;
        padding: 20px 0 10px 0;
        height: 54px;
        line-height: 1.4;
        width: 100%;
        @include clamp(1);
      }

      .singer {
        margin-top: 6px;
        color: $color-sub;
      }
    }
  }
}
</style>
