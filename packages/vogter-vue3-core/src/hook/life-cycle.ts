/*
 * @description: vogter-core life cycle
 * @version: 1.0
 * @autor: HANS丶许
 * @email: 592576605@qq.com
 * @date: 2021-03-27 13:56:39
 * @lastEditors: HANS丶许
 * @lastEditTime: 2021-03-28 01:46:51
 */

import { HookService } from '@vogter/vue3-hook'
import { LifeCycle } from '../core/options'
import liftCycleOpt from './cycle-option'

export default class lifeCycle implements LifeCycle{
  beforeGetSystem: any
  awaitGetSystem: any
  afterGetSystem: any
  beforeCoreReady: any
  awaitCoreReady: any
  afterCoreReady: any
  beforeCreateApp: any
  afterCreateApp: any

  /**
   * @description: init lifeCycle
   * @param {*}
   * @return {*}
   * @author: HANS丶许
   */
  $initLifeCycle(hookService: HookService) {
    this.beforeGetSystem = { hook: hookService.$createHook(liftCycleOpt.beforeGetSystemOpt), hookOption: liftCycleOpt.beforeGetSystemOpt }
    this.awaitGetSystem = { hook: hookService.$createHook(liftCycleOpt.awaitGetSystemOpt), hookOption: liftCycleOpt.awaitGetSystemOpt }
    this.afterGetSystem = { hook: hookService.$createHook(liftCycleOpt.afterGetSystemOpt), hookOption: liftCycleOpt.afterGetSystemOpt }
    this.beforeCoreReady = { hook: hookService.$createHook(liftCycleOpt.beforeCoreReadyOpt), hookOption: liftCycleOpt.beforeCoreReadyOpt }
    this.awaitCoreReady = { hook: hookService.$createHook(liftCycleOpt.awaitCoreReadyOpt), hookOption: liftCycleOpt.awaitCoreReadyOpt }
    this.afterCoreReady = { hook: hookService.$createHook(liftCycleOpt.afterCoreReadyOpt), hookOption: liftCycleOpt.afterCoreReadyOpt }
    this.beforeCreateApp = { hook: hookService.$createHook(liftCycleOpt.beforeCreateAppOpt), hookOption: liftCycleOpt.beforeCreateAppOpt }
    this.afterCreateApp = { hook: hookService.$createHook(liftCycleOpt.afterCreateAppOpt), hookOption: liftCycleOpt.afterCreateAppOpt }
  }
}