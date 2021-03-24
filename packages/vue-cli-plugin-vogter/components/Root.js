import Vue from 'vue'
import Vuex from 'vuex'
import Router from 'vue-router'

// 状态管理
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {

  },
  getters: {

  },
  mutations: {

  },
  actions: {

  }
})

// 路由挂载
Vue.use(Router)
const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: []
})

export default App => ({
  store,
  router,
  render: h => h(App)
})
