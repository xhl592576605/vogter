module.exports = {
  devServer: {
    // * 开发端口
    port: 8080,
    // * 接口代理
    // proxy: { },
    // * 页面代理
    historyApiFallback: {
      rewrites: [
        {
          from: '.*',
          to: '/pages/index.html'
        }],
      htmlAcceptHeaders: ['text/html']
    },
    open: true,
    overlay: true
  },
  // * 编译成果输出目录
  outputDir: 'public',
  // * 静态资源输出目录
  assetsDir: 'views/__assets__',
  // * 禁用css抽取
  css: { extract: false },
  // * babel转译兼容
  transpileDependencies: [],
  // * 公共项剥离
  configureWebpack: {
    externals: {
      vue: 'Vue',
      vuex: 'Vuex',
      'vue-router': 'VueRouter',
      lodash: '_',
    }
  }
}
