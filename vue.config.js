/**
 * @type {import('@vue/cli-service').ProjectOptions}
 * */
module.exports = {
  lintOnSave: false,
  configureWebpack: {
    resolve: {
      alias: {
        '@a': './src/assets'
      }
    }
  },
  css: {
    loaderOptions: {
      scss: {
        prependData: `
        @import "~@/assets/scss/variable.scss";
        @import "~@/assets/scss/mixin.scss";
        @import "~@/assets/scss/comm.scss";
        `
      }
    }
  }
}
