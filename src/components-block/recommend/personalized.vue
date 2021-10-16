<template>
  <div class='wrap container'>
    <recommend-title>推荐歌单</recommend-title>
    <ul class='list'>
      <li v-for='item in personalized' :key='item.id'>
        <div class='pic'>
          <img v-lazy='item.picUrl' alt=''>
        </div>
        <h4 class='name'>
          {{ item.name }}
        </h4>
      </li>
    </ul>
  </div>
</template>

<script>
// 推荐歌单
import RecommendTitle from '@/components/title/recommend-title'

export default {
  name: 'personalized',
  props: ['personalized'],
  components: { RecommendTitle }
}
</script>

<style scoped lang='scss'>
.wrap {
  .list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding-top: 32px;

    li {
      width: 207px;

      .pic {
        width: 100%;
        height: 207px;

        box-shadow: 0px 12px 18px 0px rgba(22, 33, 42, 0.5);
        border-radius: 42px;
        overflow: hidden;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .name {
        margin-top: 20px;
        margin-bottom: 32px;
        height: 66px;
        color: $color-light;
        font-size: $font-size-medium;
        line-height: 1.5;
        @include clamp(2);
      }
    }
  }
}
</style>
