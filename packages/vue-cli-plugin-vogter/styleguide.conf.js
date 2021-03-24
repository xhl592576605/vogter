const __commander = require('commander')
const commander = new __commander.Command()
commander
  .option('-d --debug')
  .option('-c --config [config]')
  .option("--no-clean")
  .parse(process.argv)
const debug = commander.debug
const views = process.VIEWS
const isRes = process.isRes
const fs = require('fs')
const path = require('path')
const pageContents = fs.readFileSync(path.resolve(process.env.INIT_CWD, 'public/pages/index.html'), 'utf-8').split('\n')// || 'E:/HANS/SourceCode/vue-cli-umd-plugin-demo'
const htmlElementArray = pageContents.map(content => {
  let tag = content.match(/(?<=<)\w+/);
  if (null !== tag) {
    return {
      tag: tag[0],
      ...(content.match(/\w+="[^"]*"/g) || []).reduce((e, n) => {
        let t = n.split('='),
          s = t[0],
          o = t[1].replace(/"/g, '');
        return e[s] = o, e
      }, {})
    }
  }
}).filter(Boolean)

const scriptsArray = htmlElementArray.filter(element => {
  const { tag, src } = element
  return tag === 'script' &&
    src &&
    !src.includes('/pages/js') &&
    !src.includes('requirejs')
}).map(el => {
  isRes && (el.src = `..${el.src}`)
  return el
}).concat([
  'https://cdn.jsdelivr.net/npm/react@16.13.1/umd/react.production.min.js',
  'https://cdn.jsdelivr.net/npm/react-dom@16.8.0/umd/react-dom.production.min.js',
  'https://cdn.jsdelivr.net/npm/vue-template-compiler@2.6.11/browser.min.js',
  'https://cdn.jsdelivr.net/npm/prismjs@1.20.0/prism.min.js',
  'https://cdn.jsdelivr.net/npm/jss@10.3.0/dist/jss.min.js',
  'https://cdn.jsdelivr.net/npm/acorn@7.3.1/dist/acorn.js',
  'https://cdn.jsdelivr.net/npm/buble@0.20.0/dist/buble-browser-deps.umd.js',
  'https://cdn.bootcdn.net/ajax/libs/require.js/2.3.6/require.js'].map(src => ({
    tag: 'script',
    src
  })))
const linksArray = htmlElementArray.filter(element => {
  const { tag, href } = element
  return tag === 'link' || (href && !href.includes('/pages/js'))
})

const getCompentPath = function (path) {
  return /\.(vue|js)$/.test(path) ||
    (path += '/index.js'), '.' === path[0]
    || path.includes('node_modules') || (path = 'node_modules/' + path),
    path
}
const getCompsSections = function (views, name) {
  if (Object.values(views).every(value => 'string' === typeof value)) {
    return {
      name,
      sectionDepth: 99,
      components: Object.values(views).map(getCompentPath)
    }
  } else {
    Object.entries(views).map(([key, value]) => {
      if (!views['其他示例']) {
        views['其他示例'] = {}
      }
      if ('string' === typeof value) {
        views['其他示例'][key] = value
        delete views[key]
      }
    })
    return {
      name,
      sectionDepth: 99,
      sections: Object.entries(views)
        .filter(([, value]) => {
          return '{}' !== JSON.stringify(value)
        }).map(([key, value]) => {
          return getCompsSections(value, key)
        })
    }
  }
}
const compsSections = getCompsSections(views)
debug && console.log('compsSections[示例组件]', compsSections)
module.exports = {
  title: process.env.npm_package_name,
  version: 'v' + process.env.npm_package_version,
  assetsDir: 'public',
  styleguideDir: 'public/help',
  template: {
    head: {
      scripts: scriptsArray,
      links: linksArray
    }
  },
  getExampleFilename (componentPath) {
    return componentPath.replace('components', 'vue-styleguidist-example').replace(/\.vue?$/, '.md')
  },
  serverPort: 6066,
  components: compsSections.components,
  sections: compsSections.sections,
  pagePerSection: true,
  exampleMode: 'collapse',
  tocMode: 'expand',
  usageMode: 'expand',
  // locallyRegisterComponents: true,
  dangerouslyUpdateWebpackConfig: (webpackConfig) => {
    if (webpackConfig.externals) {
      webpackConfig.externals = [webpackConfig.externals, {
        react: 'React',
        'react-dom': 'ReactDOM',
        'vue-template-compiler': 'VueTemplateCompiler',
        prismjs: 'Prism',
        jss: 'jss',
        acorn: 'acorn',
        buble: 'buble'
      },
      function (context, request, callback) {
        let __loash = request.match(/lodash\/(.+)/)
        if (__loash) {
          return callback(null, ['_', __loash[1]])
        }
        callback()
      }]
    }
    webpackConfig.plugins = webpackConfig.plugins.
      filter(conf => !['CopyPlugin', 'PreloadPlugin', 'HtmlWebpackPlugin']
        .includes(conf.constructor.name))

    const cliCompRule = /vue-cli-plugin-vogter[\\/]components/;
    webpackConfig.module.rules.forEach(rule => {
      (rule.use || []).forEach(({ loader }) => {
        if (loader.includes('eslint-loader')) {
          rule.exclude.push(cliCompRule)
        }
        if (loader.includes('babel-loader')) {
          rule.exclude.push(cliCompRule)
        }
      })
      webpackConfig.module.rules.push({
        test: /\.m?jsx?$/,
        include: cliCompRule,
        use: [{
          loader: "babel-loader",
          options: {
            configFile: path.resolve(__dirname,
              "./components/babel.config.js")
          }
        }]
      })
    })
    return webpackConfig
  },
  renderRootJsx: path.join(__dirname, "components/Root.js"),
  styleguideComponents: {
    "ReactComponent/ReactComponent": path.join(__dirname, "components/ReactComponent"),
    ComponentsListRenderer: path.join(__dirname, "components/ComponentsListRenderer"),
    TableOfContentsRenderer: path.join(__dirname, "components/TableOfContentsRenderer"),
    StyleGuideRenderer: path.join(__dirname, "components/StyleGuideRenderer"),
    Link: path.join(__dirname, "components/Link"),
    TabButton: path.join(__dirname, "components/TabButton"),
    ToolbarButton: path.join(__dirname, "components/ToolbarButton"),
    Arguments: path.join(__dirname, "components/ArgumentsRenderer")
  }
}
