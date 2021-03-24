
const CONFIG = require('../vue.config.js')
const PAGES = {
  index: {
    entry: 'frame/web/main.ts',
    template: 'frame/pages/index.html',
    filename: 'pages/index.html',
    minify: false
  }
}

module.exports = {
  ...CONFIG,
  pages: PAGES,
  chainWebpack: config => {
    // * js输出路径
    config.output
      .libraryTarget('var')
      .filename('pages/js/[name].js')
      .chunkFilename('views/[name]/index.js')
    // * 删除预请求，减少首屏带宽占用
    Object.keys(PAGES).forEach(name => config.plugins.delete(`prefetch-${name}`))
  }
}