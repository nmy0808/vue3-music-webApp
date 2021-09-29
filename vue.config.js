/**
 * @type {import('vue-router').RouteRecordRaw[]}
 * */
module.exports = {
  css: {
    loaderOptions: {
      scss: {
        prependData: `
        @import "~@/assets/scss/mixin.scss";
        @import "~@/assets/scss/variable.scss";
        `
      }
    }
  }
}
