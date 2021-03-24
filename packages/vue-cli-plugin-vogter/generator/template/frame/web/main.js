import Vue from 'vue'
//import App from './App.vue'

// Vue.config.productionTip = false
const $frame = window.$frame
const { root = {} } = $frame
const { path } = root //='/views/app/index.js'
window.require([path], module => {
  const app = (module.__esModule === true ? module.default : module)
  new Vue({
    render: h => h(
      'div',
      { attrs: { id: 'app' }, class: `app--theme` },
      [
        h(app)
      ]
    ),
  }).$mount('#app')
})

