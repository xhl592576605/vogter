/*
 * @description: frame config
 * @version: 1.0
 * @autor: HANS丶许
 * @email: 592576605@qq.com
 * @date: 2021-03-28 00:09:21
 * @lastEditors: HANS丶许
 * @lastEditTime: 2021-03-28 00:36:06
 */

export default {
  // 系统标题
  title: 'vogter',
  // 主题变量
  theme: 'light',
  // 代理配置
  proxy: {},
  // 登录后默认跳转的地址，支持函数
  root: '/',
  // 全局鉴权配置，支持多种，默认鉴权
  authorized: false,
  // 别名
  alias: {},
  // 路由
  routes: [],
  // 缓存控制函数
  version: function version() {
    const now = new Date()
    const year = now.getFullYear()
    const month = now.getMonth() + 1
    const day = now.getDate()
    return [year, month > 9 ? month : '0' + month, day].join('')
  }
}