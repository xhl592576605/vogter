/**
 * @description: get root path
 * @param {*}
 * @return {*}
 * @author: HANS丶许
 */
export function getRoot(): string {
  return process.env.WORKSPACE ||
    (process.env.INIT_CWD || process.env.PWD || '')
      .replace(/[\\/](__packages__|packages).*/, '')
}
/**
 * @description: check system
 * @param {*}
 * @return {*}
 * @author: HANS丶许
 */
export function isVogterSystem(): boolean {
  return !!process.env.VOGTERSYSTEM
}
