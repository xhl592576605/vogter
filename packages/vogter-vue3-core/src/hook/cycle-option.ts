import { HookOption, HookType } from '@vogter/vue3-hook'
const baseOpt = {
  prefix: 'vogter',
  suffix: 'lifeCycle',
  group: 'vogter-lifeCycle'
}

const beforeGetSystemOpt: HookOption = {
  ...baseOpt,
  name: 'beforeGetSystem',
  hookType: HookType.Default,
  context: false,
  args: ['core']
}
const awaitGetSystemOpt: HookOption = {
  ...baseOpt,
  name: 'async.getSystem',
  hookType: HookType.Bail,
  context: false,
  args: ['core']
}
const afterGetSystemOpt: HookOption = {
  ...baseOpt,
  name: 'afterGetSystem',
  hookType: HookType.Default,
  context: false,
  args: ['core']
}

const beforeCoreReadyOpt: HookOption = {
  ...baseOpt,
  name: 'beforeCoreReady',
  hookType: HookType.Default,
  context: false,
  args: ['core']
}
const awaitCoreReadyOpt: HookOption = {
  ...baseOpt,
  name: 'async.coreReady',
  hookType: HookType.Bail,
  context: false,
  args: ['core']
}
const afterCoreReadyOpt: HookOption = {
  ...baseOpt,
  name: 'afterCoreReady',
  hookType: HookType.Default,
  context: false,
  args: ['core']
}
const beforeCreateAppOpt: HookOption = {
  ...baseOpt,
  name: 'beforeCreateApp',
  hookType: HookType.Default,
  context: false,
  args: ['core']
}
const afterCreateAppOpt: HookOption = {
  ...baseOpt,
  name: 'afterCreateApp',
  hookType: HookType.Default,
  context: false,
  args: ['core']
}
export default {
  beforeGetSystemOpt,
  awaitGetSystemOpt,
  afterGetSystemOpt,
  beforeCoreReadyOpt,
  awaitCoreReadyOpt,
  afterCoreReadyOpt,
  beforeCreateAppOpt,
  afterCreateAppOpt
}