import core from "./index";
import { RouterOptions } from "vue-router";
import { StoreOptions } from "vuex";
import { HookService } from "@vogter/vue3-hook";


export interface CoreOption {
  store: StoreOptions<Object>,
  router: RouterOptions,
  lifeCycles?: Array<LifeCycle>,
  plugins?: Array<any>
  hooks?: EventObject,
  vogterPlugins?: Array<VogterPlugin>,
  alias?: Object
}

export interface EventObject {
  [key: string]: Function | Array<Function> | string
}
export interface LifeCycle {
  $initLifeCycle: (hookService: HookService) => void
}
export interface VogterPlugin {
  name: String,
  apply: ($core: core) => void
}