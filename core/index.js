#!/usr/bin/env node

const package = require('../package.json')
const chalk = require('chalk')
const { program } = require('commander')
program.version('0.0.1-alpha')

// 配置对应命令参数
program
  .option('-v, --version', 'output tool version')
  .option('-e, --entry', 'custom entry')
  .option('-o, --output', 'output dirtory')

program.parse(process.argv)

const options = program.opts()
if (options.version) {
  console.log(chalk.green(package.version))
}

const entry_file = program.entry || 'src'
const output = program.output || 'src'

