module.exports = {
  plugins: {
    'postcss-pxtorem': {
      rootValue: 75, // 75表示750设计稿，37.5表示375设计稿
      propList: ['*']
      // selectorBlackList: ['van'], // vant设计稿为375，当以750设计稿为基础设置时，需要屏蔽vant
      // exclude: /web/i     //忽略文件 : 忽略 web下所有文件
    }
  }
}
