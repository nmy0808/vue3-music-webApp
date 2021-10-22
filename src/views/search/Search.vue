<template>
  <div class='search-wrap container' v-load='isLoading'>
    <div class='input-box' @click='onFocusToInput'>
      <input type='text' v-model='keyWord' ref='inputRef'>
      <i class='icon-search'></i>
      <i class='icon-close' v-show='keyWord!==""' @click.stop='onClearKeyWord'></i>
    </div>
    <div class='hot-word' v-show='!isHotShow'>
      <div class='hot-item'>热门搜索</div>
      <div class='hot-item' v-for='item in hots' :key='item' @click='onSelectHotItem(item)'>{{ item.first }}</div>
    </div>
    <scroll class='search-scroll-wrap container' v-if='isHotShow' :bounce='true' ref='scrollRef'>
      <user-list :list='searchList' @select='onSelectItem'></user-list>
    </scroll>
  </div>
</template>

<script>
import Scroll from '@/components/scroll/scroll'
import UserList from '@/components-block/user/user-list'
import { computed, nextTick, ref, watch, watchEffect } from 'vue'
import { getHotList, getHotListToKeyWord } from '@/api'
import usePlay from '@/views/search/use-play'

export default {
  name: 'Search',
  components: {
    UserList,
    Scroll
  },
  setup() {
    // 热门
    const keyWord = ref('')
    const hots = ref([])
    const searchList = ref([])
    const inputRef = ref(null)
    const scrollRef = ref(null)
    const isHotShow = computed(() => searchList.value.length !== 0)
    const isLoading = ref(false)
    watchEffect(async () => {
      const hotList = await getHotList()
      hots.value = hotList
    })
    // 点击热词
    const onSelectHotItem = async (keywords) => {
      keyWord.value = keywords.first
    }
    watch(keyWord, async (keywords) => {
      if (keywords.trim() !== '') {
        searchList.value = []
        isLoading.value = true
        const result = await getHotListToKeyWord({ keywords })
        isLoading.value = false
        searchList.value = result
        await nextTick(() => {
          scrollRef.value && scrollRef.value.refresh()
        })
      } else {
        searchList.value = []
      }
    })
    // 清空关键词
    const onClearKeyWord = () => {
      keyWord.value = ''
    }
    // 点击焦点
    const onFocusToInput = () => {
      inputRef.value.focus()
    }
    // 点击歌曲
    const { getSongDetailToId } = usePlay()

    const onSelectItem = async (id) => {
      await getSongDetailToId(id)
    }
    return {
      hots,
      onSelectHotItem,
      searchList,
      isHotShow,
      keyWord,
      scrollRef,
      inputRef,
      isLoading,
      onClearKeyWord,
      onFocusToInput,
      onSelectItem

    }
  }
}
</script>

<style scoped lang='scss'>
.search-wrap {
  position: fixed;
  left: 0;
  top: 176px;
  bottom: 0;
  right: 0;
  z-index: 10;

  .input-box {
    width: 686px;
    height: 66px;
    display: flex;
    align-items: center;
    background: rgba(#ffffff, 0.1);
    border-radius: 40px;
    margin-top: 32px;
    position: relative;
    margin-bottom: 32px;

    .icon-search {
      width: 24px;
      height: 24px;
      @include bg-image('~@/assets/imgs/search');
      background-size: cover;
      position: absolute;
      left: 32px;
      @extend .center-v;
    }

    .icon-close {
      width: 34px;
      height: 34px;
      @include bg-image('~@/assets/imgs/close_btn');
      background-size: 30px;
      background-position: center;
      position: absolute;
      right: 32px;
      @extend .center-v;
    }

    input {
      width: 100%;
      height: 100%;
      background: transparent;
      outline: none;
      border: none;
      padding: 0 80px;
      color: #fff;
    }
  }

  .hot-word {
    color: $color-sub;
    font-size: $font-size-large;
    display: flex;
    flex-wrap: wrap;
    padding-bottom: 34px;

    .hot-item:first-of-type {
      color: $color-light;
    }

    .hot-item {
      padding: 16px 0;
      margin-right: 32px;
    }
  }

  .search-scroll-wrap {
    width: 100%;
    position: fixed;
    left: 0;
    top: 290px;
    bottom: 0;
    overflow: hidden;
  }
}
</style>
