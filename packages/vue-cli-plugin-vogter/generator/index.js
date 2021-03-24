module.exports = (api, options = {}, rootOptions = {}) => {
  const { vueVersion } = rootOptions
  if (vueVersion === '3') {
    console.log('正在进行vue3的vogter框架初始化....')
    let _extendPackage = {}
    let fileKeys = []
    let fileTemplate
    if (options.isVue3Ts) {
      _extendPackage = {
        "scripts": {
          "serve": "run-p \"build:frame -- --watch\" serve:views",
          "build": "npm run build:frame  && npm run build:views",
          "lint": "vue-cli-service lint",
          "serve:frame": "vue-cli-service serve -c ./frame/entry.conf.ts -d",
          "build:frame": "vue-cli-service build -c ./frame/entry.conf.ts --no-clean",
          "serve:local": "vue-cli-service serve -v ./views.local.ts -d",
          "build:local": "vue-cli-service build -v ./views.local.ts --no-clean",
          "serve:views": "vue-cli-service serve -v ./views.ts -d",
          "build:views": "vue-cli-service build -v ./views.ts --no-clean --report"
        },
        "devDependencies": {
          "npm-run-all": "^4.1.5"
        },
        "vuePlugins": {
          "service": [
            "node_modules/vue-cli-plugin-vogter/index.js"
          ]
        }
      }
      fileKeys = ['public/favicon.ico', 'public/index.html', 'src/App.vue', 'src/main.ts', 'src/components/HelloWorld.vue']
      fileTemplate = './template-vue3-ts'
    } else {
      _extendPackage = {
        "scripts": {
          "serve": "run-p \"build:frame -- --watch\" serve:views",
          "build": "npm run build:frame  && npm run build:views",
          "lint": "vue-cli-service lint",
          "serve:frame": "vue-cli-service serve -c ./frame/entry.conf.js -d",
          "build:frame": "vue-cli-service build -c ./frame/entry.conf.js --no-clean",
          "serve:local": "vue-cli-service serve -v ./views.local.js -d",
          "build:local": "vue-cli-service build -v ./views.local.js --no-clean",
          "serve:views": "vue-cli-service serve -v ./views.js -d",
          "build:views": "vue-cli-service build -v ./views.js --no-clean --report"
        },
        "devDependencies": {
          "npm-run-all": "^4.1.5"
        },
        "vuePlugins": {
          "service": [
            "node_modules/vue-cli-plugin-vogter/index.js"
          ]
        }
      }
      fileKeys = ['public/favicon.ico', 'public/index.html', 'src/App.vue', 'src/main.js', 'src/components/HelloWorld.vue']
      fileTemplate = './template-vue3'
    }
    if (fileTemplate) {
      api.extendPackage(_extendPackage)
      api.render((files, render) => {
        fileKeys.forEach(key => {
          delete files[key]
        })
      })
      api.render(fileTemplate)
    }
  } else {
    console.log('正在进行vue2的vogter框架初始化....')
    api.extendPackage({
      "scripts": {
        "serve": "run-p \"build:frame -- --watch\" serve:views",
        "build": "npm run build:frame  && npm run build:views",
        "lint": "vue-cli-service lint",
        "serve:frame": "vue-cli-service serve -c ./frame/entry.conf.js -d",
        "build:frame": "vue-cli-service build -c ./frame/entry.conf.js --no-clean",
        "serve:local": "vue-cli-service serve -v ./views.local -d",
        "build:local": "vue-cli-service build -v ./views.local --no-clean",
        "serve:views": "vue-cli-service serve -v ./views -d",
        "build:views": "vue-cli-service build -v ./views --no-clean --report",
        "serve:styleguidist": "vue-cli-service styleguidist -v ./views.styleguidist.js -d",
        "build:styleguidist": "vue-cli-service styleguidist:build  -res -v ./views.styleguidist.js "
      },
      "devDependencies": {
        "npm-run-all": "^4.1.5",
        "vue-cli-plugin-styleguidist": "^4.34.2",
        "@babel/plugin-proposal-class-properties": "^7.12.1",
        "@babel/preset-react": "^7.12.10"
      },
      "vuePlugins": {
        "service": [
          "node_modules/vue-cli-plugin-vogter/index.js"
        ]
      }
    })
    const fileKeys = ['public/favicon.ico', 'public/index.html', 'src/App.vue', 'src/main.js', 'src/components/HelloWorld.vue']
    api.render('./template')
    api.render((files, render) => {
      fileKeys.forEach(key => {
        delete files[key]
      })
    })
  }
  api.exitLog('初始化完成', 'info')
  api.exitLog('"npm run serve" 运行项目', 'info')
}