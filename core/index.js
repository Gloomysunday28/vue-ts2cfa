#!/usr/bin/env node

const package = require('../package.json')
const chalk = require('chalk')
const { program } = require('commander')
program.version('0.0.1-alpha')

program.option('-v, --version', 'output tool version')
program.parse(process.argv)

const options = program.opts()
if (options.version) {
  console.log(chalk.green(package.version))
}