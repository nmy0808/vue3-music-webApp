const registerRouter = require('./backend/router')
/**
 * @type {import('@vue/cli-service').ProjectOptions}
 * */
module.exports = {
  // lintOnSave: false,
  css: {
    loaderOptions: {
      scss: {
        prependData: `
        @import "~@/assets/scss/mixin.scss";
        @import "~@/assets/scss/variable.scss";
        `
      }
    }
  },
  devServer: {
    before(app) {
      registerRouter(app)
    }
  }
}
