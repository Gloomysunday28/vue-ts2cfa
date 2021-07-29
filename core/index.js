#!/usr/bin/env node

const packageJSON = require('../package.json')
const path = require('path')
const chalk = require('chalk')
const chainTool = require('./chainTool')
const { program } = require('commander')
const rootDir = process.cwd()

program.version('0.0.1-alpha')

// 配置对应命令参数
program
  .option('-v, --version', 'output tool version')
  .option('-e, --entry', 'custom entry')
  .option('-o, --output', 'output dirtory')

program.parse(process.argv)

const options = program.opts()
if (options.version) {
  console.log(chalk.green(packageJSON.version))
}

const entry_file = program.entry || 'src'
const output = program.output || 'src-output'

chainTool.traverse(path.resolve(rootDir, entry_file))