import core from './core'
import appComp from './component/app-component'
import { LifeCycle, VogterPlugin } from './core/options'
import lifeCycle from './hook/life-cycle'
export default new core(appComp)
export {
  core,
  lifeCycle,
  VogterPlugin,
  LifeCycle
}
export * from './globalExtensions'