const packageJSON = require('../package.json')
const path = require('path')
const chalk = require('chalk')
const chainTool = require('./chainTool')
const { program } = require('commander')
const { getTotalSize } = require('../utils/fs')
const ProgressBar = require('progress')
const rootDir = process.cwd()
const { rmAndMkdirSync } = require('../utils/fs')

program.version(packageJSON.version)
// 配置对应命令参数
program
  .option('-v, --version', 'output tool version')
  .option('-e, --entry <type>', 'custom entry')
  .option('-o, --output <type>', 'output dirtory')
  .option('-elimit, --elimit <type>', 'Error Stack Limit')
program.parse(process.argv)

const options = program.opts()
if (options.version) {
  console.log(chalk.green(packageJSON.version))
}

const entry_file = options.entry || 'src'
const output = options.output || 'src-output'

const ERRORPATH = path.resolve(process.cwd(), 'parseError')

Error.stackTraceLimit = options.elimit ? + options.elimit : 10
rmAndMkdirSync(ERRORPATH, path.resolve(ERRORPATH, 'error.log'))

const totalSize = getTotalSize(entry_file)
const bar = new ProgressBar('转换中... [:bar] 完成进度: :current/:total 完成进度百分比: :percent  完成倒计时: :eta', {
  complete: '🚗',
  incomplete: ' ',
  width: 20,
  total: totalSize,
})
chainTool.traverse(path.resolve(rootDir, entry_file), path.resolve(rootDir, output), bar)

