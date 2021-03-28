#!/usr/bin/env node
var commander = require('commander')

commander
  .usage('<command> [options]')
  .command('copy', '拷贝类库')
  .parse(process.argv)
