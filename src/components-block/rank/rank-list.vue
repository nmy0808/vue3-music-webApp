<template>
  <div class='rank-list'>
    <div class='rank-item' v-for='item in list' :key='item.id' @click.prevent='onToPageDetail(item.id)'>
      <div class='pic'>
        <img :src='item.coverUrl'>
      </div>
      <div class='desc'>
        <template v-for='(song,index) in item.songs' :key='song.id'>
          <div class='song-item' v-if='index<3'>
            <h4>
              <span class='num'>{{ index + 1 }}.</span>
              {{ song.name }}
            </h4>
          </div>
        </template>
      </div>
    </div>
    <mini-player-box></mini-player-box>
  </div>
</template>

<script>
import MiniPlayerBox from '@/components/mini-player-box/mini-player-box'

export default {
  name: 'rank-list',
  components: { MiniPlayerBox },
  props: ['list'],
  methods: {
    onToPageDetail(id) {
      this.$router.push('/rank/detail/' + id)
    }
  }
}
</script>

<style scoped lang='scss'>
.rank-list {
  width: 100%;
  padding: 4px 0;

  .rank-item {
    display: flex;
    align-items: center;
    padding: 16px;
    box-sizing: border-box;
    border-radius: 40px;
    overflow: hidden;
    background: rgba(#ffffff, 10%);
    margin: 32px 0;

    .pic {
      width: 178px;
      height: 178px;
      overflow: hidden;
      border-radius: 40px;
      overflow: hidden;

      img {
        width: 100%;
        border-radius: 40px;
      }
    }

    .desc {
      width: 65%;
      height: 178px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;

      h4 {
        width: 100%;
        height: 28px;
        font-size: $font-size-large;
        color: $color-light;
        margin-left: 16px;
        @include clamp(1);

        .num {
          width: 1em;
          display: inline-block;
        }
      }
    }
  }
}
</style>
