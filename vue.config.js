/**
 * @type {import('@vue/cli-service').ProjectOptions}
 * */
module.exports = {
  lintOnSave: false,
  outputDir: 'vue3-music',
  pages: {
    index: {
      // page 的入口
      entry: 'src/main.js',
      // 模板来源
      template: 'public/index.html',
      filename: 'index.html',
      title: 'vue3 music'
    }
  },
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
  },
  productionSourceMap: false
}
