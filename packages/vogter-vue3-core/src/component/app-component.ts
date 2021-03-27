/*
 * @description: render app
 * @version: 1.0
 * @autor: HANS丶许
 * @email: 592576605@qq.com
 * @date: 2021-03-25 21:48:28
 * @lastEditors: HANS丶许
 * @lastEditTime: 2021-03-28 00:50:52
 */

import { h } from 'vue'
export default {
  name: 'App',
  render() {
    const { $core } = this as any
    const { $frame = {} } = $core
    return ($frame.render && $frame.render.call(this, h)) ||
      h('h1', {}, 'vogter')
  }
}