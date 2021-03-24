const path = require('path')
// const __commander = require("commander")
// const commander = new __commander.Command()
const commander = require("commander")
commander.option("-d --debug")
  .option("-c --config [config]")
  .option("-l --limit [limit]", "limit of assets", 4)
  .option("--no-minimize [minimize],", "is minimize source")
  .option("-v --views [views]")
  .option("--no-clean")
  .option('--watch')
  .option('styleguidist')
  .option("-res --resource")
  .option("--report")
  .parse(process.argv)
const args1 = commander.args[1]
const debug = commander.debug
const config = commander.config
const limit = commander.limit
const minimize = commander.minimize
const isRes = commander.resource

const views = function getViews (views, args1) {
  let viewsObj = {};
  for (let key in views) {
    let t = views[key];
    if ("[object Object]" === Object.prototype.toString.call(t)) {
      let o = getViews(t, args1);
      "{}" !== JSON.stringify(o) && (viewsObj[key] = o)
    } else args1 ? args1.split(",").forEach(e => {
      t.includes(e) && (viewsObj[key] = t)
    }) : viewsObj[key] = t
  }
  return viewsObj
}(commander.views ? require(path.resolve(process.env.INIT_CWD, commander.views)) : {}, args1) // ||'E:/HANS/SourceCode/vue-cli-umd-plugin-demo'

config && (process.env.VUE_CLI_SERVICE_CONFIG_PATH = require("path").resolve(process.env.INIT_CWD, config))
args1 && process.argv.pop()
const styleguidistCommand = ["styleguidist", "styleguidist:build"]
if (styleguidistCommand.includes(process.argv[2])) {
  process.VIEWS = views
  process.argv[3] = "--config"
  process.argv[4] = "node_modules/vue-cli-plugin-vogter/styleguide.js"// "node_modules/vue-cli-plugin-vogter/styleguide.conf.js"
  process.isRes = isRes
  debug && console.log("styleguidist-process:\n", process.argv)
  module.exports = (api, options) => {
    delete options.assetsDir, delete options.css
  }
}
else {
  module.exports = (api) => {
    api.chainWebpack(webpackConf => {
      if (commander.views && "{}" === JSON.stringify(views)) {
        throw new Error(`【${commander.views}】中未匹配到任何视图`);
      }
      const isDevelopment = "development" === process.env.NODE_ENV
      const addEntryPoint = (views) => {
        Object.entries(views).forEach(([key, value]) => {
          "!" !== key[0] && (key = key.replace("!", ""), "[object Object]" === Object.prototype.toString.call(value) ?
            addEntryPoint(value) : webpackConf.entry(key).add(value))
        })
      }
      debug && console.log('\nviews', views)
      addEntryPoint(views) // 添加多个webpack入口
      "serve:frame" === process.env.npm_lifecycle_event &&
        (webpackConf.devServer.contentBase = [path.resolve("public"), path.resolve("frame")])
      webpackConf.entryPoints.delete("app") // 删除原本的入口
      const excludeModule = webpackConf.module.rule("js").exclude.values()[0];
      const transpileDependencies = function (dependencies) {
        const _dependencies = dependencies.map(dependencie => {
          if ("string" == typeof dependencies) {
            const dependenciesPath = path.join("node_modules", dependencies, "/");
            return "win32" === process.platform ? dependenciesPath.replace(/\\/g, "\\\\") :
              dependenciesPath
          }
          if (dependencie instanceof RegExp) return dependencie.source
        });
        return _dependencies.length ? new RegExp(_dependencies.join("|")) : null
      }((process.env.npm_package_transpileDependencies || "").split(",").filter(Boolean))

      webpackConf.module.rule("js").exclude.clear().add(m => {
        if (!0 === excludeModule(m)) return (!transpileDependencies || !transpileDependencies.test(m)) && /node_modules/.test(m)
      })

      webpackConf.output
        .library(process.env.npm_package_library)
        .libraryTarget("umd")
        .filename("[name]")
        .chunkFilename("[name]")
      webpackConf.plugins.delete("html")
      webpackConf.plugins.delete("prefetch")
      webpackConf.plugins.delete("preload")
      webpackConf.module.rules.delete("pug")
      webpackConf.module.rules.delete("postcss")
      webpackConf.module.rules.delete("sass")
      webpackConf.module.rules.delete("less")
      webpackConf.module.rules.delete("stylus")
      webpackConf.module.rules.delete("docs")
      webpackConf.module.rule("images").use("url-loader").loader("url-loader").tap(e => Object.assign(e, {
        limit: 1024 * limit
      }))
      webpackConf.plugins.delete("copy")
      !isDevelopment && webpackConf.optimization.minimize(minimize)
      !isDevelopment && webpackConf.performance.maxAssetSize(1048576).maxEntrypointSize(1048576)
      webpackConf.optimization.splitChunks({
        minSize: 10485760,
        minChunks: 1024,
        cacheGroups: {
          vendors: false,
          default: false
        }
      })
      debug && console.log('\nwebpackConf', webpackConf)
    })
  }
}