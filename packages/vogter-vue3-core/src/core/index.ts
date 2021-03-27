/*
 * @description: vogter core
 * @version: 1.0
 * @autor: HANS丶许
 * @email: 592576605@qq.com
 * @date: 2021-03-25 21:19:17
 * @lastEditors: HANS丶许
 * @lastEditTime: 2021-03-28 01:44:33
 */
import _ from 'lodash'
import { App } from '@vue/runtime-core'
import { Store, createStore } from 'vuex'
import { createRouter, Router } from 'vue-router'
import { createApp } from '@vue/runtime-dom'
import { Component, reactive } from 'vue'
import { HookService } from '@vogter/vue3-hook'
import { version } from '../../package.json'
import lifeCycle from '../hook/life-cycle'
import { CoreOption, LifeCycle,VogterPlugin } from './options'
export default class core {
  version = version
  appComp: Component
  $el: string = '#app'
  $vm: App | null = null
  appOpts = {}
  $store: Store<any> | null = null
  $router: Router | null = null
  $hook: HookService
  $lifeCycle: LifeCycle
  $plugins?: Array<VogterPlugin>
  $frame: Object = {}
  $alias: Object = {}
  constructor(appComp: Component) {
    this.appComp = appComp
    if (!window.$vogter) {
      window.$vogter = {
      }
    }
    this.$hook = new HookService()
    this.$lifeCycle = new lifeCycle()
    this.$lifeCycle.$initLifeCycle(this.$hook)
    window.$vogter.$core = this
  }

  /**
   * @description: 初始化vue，执行声明周期
   * @param {StoreOptions} store
   * @param {RouterOptions} router
   * @return {*}
   * @author: HANS丶许
   */
  async $init(option: CoreOption): Promise<void> {
    // init core conf
    this.$initCoreConf(option)

    // init system config
    const $lifeCycle = this.$lifeCycle as lifeCycle
    $lifeCycle.beforeGetSystem.hook.call(this)
    await $lifeCycle.awaitGetSystem.hook.promise(this)
    $lifeCycle.afterGetSystem.hook.call(this)

    //init core
    $lifeCycle.beforeCoreReady.hook.call(this)
    await $lifeCycle.awaitCoreReady.hook.promise(this)
    $lifeCycle.afterCoreReady.hook.call(this)

    // create app
    $lifeCycle.beforeCreateApp.hook.call(this)
    this.$vm = createApp({ ...this.appComp, ...this.appOpts })
    $lifeCycle.beforeCreateApp.hook.call(this)

    //use plugin
    this.$usePlugin(option)

    // set global 
    this.$vm.config.globalProperties.$core = this
    
    // mount app
    this.$vm.mount(this.$el)
  }

  /**
   * @description: init core config
   * @param {*}
   * @return {*}
   * @author: HANS丶许
   */
  $initCoreConf(option: CoreOption): void {
    window.$vogter.$frame = this.$frame = reactive(_.merge(this.$frame, window.$vogter.$frame || {}))
    //@ts-ignore
    this.$alias = Object.assign({}, this.alias, option.alias || {}, this.$frame.alias || {})
    this.$store = createStore(option.store)
    this.$router = createRouter(option.router)
    this.$createLifeCycle(option.lifeCycles)
    this.$registerLifeCycle(option.hooks)
    this.$useVogterPlugin(option.vogterPlugins)
  }

  /**
   * @description: create out
   * @param {*}
   * @return {*}
   * @author: HANS丶许
   */
  $createLifeCycle(lifeCycle: Array<LifeCycle> | undefined): void {
    lifeCycle && lifeCycle.forEach(life => {
      life.$initLifeCycle(this.$hook)
      Object.assign(this.$lifeCycle, life || {})
    })
  }

  /**
   * @description: register LifeCycle
   * @param {*}
   * @return {*}
   * @author: HANS丶许
   */
  $registerLifeCycle(hooks = {}): void {
    for (const key in hooks) {
      const type = key.split('.')[0]
      const name = key.split('.')[1]
      const hook = hooks[key]
      if (type === 'vue') {
        this.appOpts[name] = hook
      }
      if (type === 'router' && this.$router) {
        this.$router[name](hook)
      }
      const lifeCycle = this.$lifeCycle[name || type]
      if (lifeCycle) {
        this.$hook.$tap({
          ...lifeCycle.hookOption,
          Hook: {
            name: key,
            fn: hook
          }
        })
      }
    }
  }

  /**
   * @description: use vogter plugin
   * @param {*}
   * @return {*}
   * @author: HANS丶许
   */
  $useVogterPlugin(plugins: Array<VogterPlugin> | undefined): void {
    this.$plugins = plugins
    plugins && plugins.forEach(plugin => {
      if (!plugin.name || Object.prototype.toString.call(plugin.apply) !== '[object Function]') {
        console.warn('no standard plugin', plugin.constructor)
        return
      }
      plugin.apply(this)
    })
  }

  /**
   * @description: use vue plugin
   * @param {*}
   * @return {*}
   * @author: HANS丶许
   */
  $usePlugin(option: CoreOption): void {
    if (this.$vm) {
      this.$store && this.$vm.use(this.$store)
      this.$router && this.$vm.use(this.$router)
      option.plugins && option.plugins.forEach(plugin => {
        this.$vm?.use(plugin)
      })
    }
  }

}
