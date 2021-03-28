
var path = require('path')
var commander = require('commander')
var fs = require('fs-extra')
var ROOT = process.env.WORKSPACE ||
  (process.env.INIT_CWD || process.env.PWD || '')
    .replace(/[\\/](__packages__|packages).*/, '')
commander
  .parse(process.argv)
const packagePath = path.resolve(ROOT, 'package.json')
const { vogterSystem } = require(packagePath)
if (vogterSystem) {
  const from = path.resolve(process.cwd(), './dist')
  const to = path.resolve(ROOT, commander.args[0])
  fs.ensureDir(from).then(() => {
    fs.copySync(from, to, {
      //@ts-ignore
      filter: function (src) {
        return !src.includes('.d.ts') && !src.includes('.js.map') 
      }
    })
    fs.removeSync(path.resolve(to,'src'))
  })
} else {
  console.warn('If you are using the vogter framework, please package.json The file configuration vogtersystem is true')
}

