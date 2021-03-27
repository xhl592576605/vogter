## @vogter/vue3-core (守卫者[核心框架])

### 框架特点
1. `@vogter`系列框架的核心库
2. 重新设计生命周期，更符合业务的钩子函数,插件机制，随时加入所需的核心机制
3. 可自定义生命周期加入框架，自由调用钩子函数，随心所以定制业务
4. 统一的入口，更加清晰
5. vue全家桶集成
6. 自定义渲染根节点

### 版本变化
- 0.0.1 初始化

### 使用方法

- 使用示例
``` js
// in main.js(.ts)
import core from '@vogter/vue3-core'
import router from './router/router' 
import store from './store/store'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import testPlugin from './vogterPlugins/testPlugin'
import testPlugin2 from './vogterPlugins/testPlugin2'
import testLifeCycle from './lifeCycle/testLifeCycle'
import './$frame-config'
core.$init({
  store, router, hooks: {
    'vue.mounted': () => {
      //只支持根组件，其余类似说明，加vue前缀
      console.log('vue-mounted')
    },
    'router.beforeEach': (to: any, from: any) => {
      //路由守卫，加router前缀
      console.log('router-beforeEach:from', from)
      console.log('router-beforeEach:to', to)
    },
    'beforeGetSystem': () => {
      console.log('beforeGetSystem')
    },
    'async.awaitGetSystem': async () => {
      console.log('async.awaitGetSystem')
    }
  },
  lifeCycles:[testLifeCycle],
  plugins: [Antd],// 使用第三方vue插件
  vogterPlugins: [testPlugin,testPlugin2]
})
```
- core.$init入参说明
``` js
export interface CoreOption {
  store: StoreOptions<Object>,//状态管理
  router: RouterOptions,// 路由
  lifeCycles?: Array<LifeCycle>,//自定义生命周期
  plugins?: Array<any>// vue插件
  hooks?: EventObject,// vue，router，生命周期的钩子回调函数
  vogterPlugins?: Array<VogterPlugin>,// 自定义插件
  alias?: Object// 组件别名
}
```
- 已有生命周期
``` json
{
  "beforeGetSystem": "获取系统配置前,需自定义插件，进行回调函数的注册",
  "awaitGetSystem": "获取系统配置,需自定义插件，进行回调函数的注册,异步，回调函数可以异步，promise",
  "afterGetSystem": "获取系统配置后,需自定义插件，进行回调函数的注册",
  "beforeCoreReady": "核心准备前,需自定义插件，进行回调函数的注册",
  "awaitCoreReady": "准备核心,需自定义插件，进行回调函数的注册,异步，回调函数可以异步，promise",
  "afterCoreReady": "核心准备后,需自定义插件，进行回调函数的注册",
  "beforeCreateApp": "创建app前,需自定义插件，进行回调函数的注册",
  "afterCreateApp": "创建app后,需自定义插件，进行回调函数的注册"
}
```

- 自定义生命周期
> 采用[@vogter/vue3-hook](https://www.npmjs.com/package/@vogter/vue3-hook)钩子机制，请先了解
``` js

import { LifeCycle } from "@vogter/vue3-core";
const baseOpt = {
  prefix: 'vogter',
  suffix: 'testlifeCycle',
  group: 'vogter-lifeCycle'
}
const testLifeCycleOpt = {
  ...baseOpt,
  name: 'afterGetSystem',
  hookType: 0,
  context: false,
  args: ['core']
}
export class testLifeCycle implements LifeCycle {
  testLifeCycle: any //生命周期对象
  $initLifeCycle(hookService: any) {
    //注册钩子
    this.testLifeCycle = {
      hook: hookService.$createHook(testLifeCycleOpt), hookOption: testLifeCycleOpt
    }
  }
}
export default new testLifeCycle()
```

- 自定义插件
``` js
//第一个插件 在apply中，使用生命周期进行回调函数的注册，当然，你可以做任何是，比如改配置等等
import { testLifeCycle } from '@/lifeCycle/testLifeCycle'
import { core, lifeCycle, VogterPlugin } from '@vogter/vue3-core'
class testPlugin implements VogterPlugin {
  name = 'test-plugin'
  apply($core: core): void {
    const $lifeCycle = $core.$lifeCycle as lifeCycle // 内置生命周期，需要断言下
    const afterGetSystemOpt = $lifeCycle.afterGetSystem.hookOption
    $core.$hook.$tap({
      ...afterGetSystemOpt,
      Hook: {
        name: 'test-func_name',
        fn: () => {
          console.log('test-vogter-plugin')
        }
      }
    })
    console.log('apply-vogter-plugin')

    const testLifeCycle = $core.$lifeCycle as testLifeCycle // 自定义生命周期，需要断言下

    const testLifeCycleOpt = testLifeCycle.testLifeCycle.hookOption
    $core.$hook.$tap({
      ...testLifeCycleOpt,
      Hook: {
        name: 'test-func_name',
        fn: () => {
          console.log('test-vogter-plugin')
        }
      }
    })
    console.log('apply-vogter-plugin')
  }
}
export default new testPlugin()

// 第一个插件 在apply，触发自定义的生命周期testLifeCycle的testLifeCycle
import { testLifeCycle } from '@/lifeCycle/testLifeCycle'
import { core, lifeCycle, VogterPlugin } from '@vogter/vue3-core'
class testPlugin2 implements VogterPlugin {
  name = 'test-plugin'
  apply($core: core): void {
    const testLifeCycle = $core.$lifeCycle as testLifeCycle
    testLifeCycle.testLifeCycle.hook.call($core)
  }
}
export default new testPlugin2()
```

- 自定义渲染函数
> 整个vogter框架的配置，最终会整个在`$vogter.$frame`,当然在`$vogter.$core`也有`$frame`对象，这个对象是响应式的

``` js
//系统启动完，会将这个配置变成响应式
window.$vogter.$frame = {
  title: 'afdsdf',
  render(h: Function) {
    const { $core } = this as any //this是组件对象
    const { $frame = {} } = $core
    return h('div', {}, $frame.title)
  }
}

```