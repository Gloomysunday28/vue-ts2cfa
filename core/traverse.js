const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const { parseComponent } = require('vue-template-compiler')
const { rmAndMkdirSync } = require('../utils/fs')

/**
 * @description
 *  递归循环对应的文件
 * @param {string} filePath 解析的文件夹路径
 * @returns {undefined}
 */
module.exports = function traverseCode(filePath, output, bar) {
  try {
    fs.readdir(filePath, (error, files) => {
      if (error) throw error
      
      files.forEach(f => {
        const depFilePath = path.resolve(filePath, f)
        const stat = fs.statSync(depFilePath)
        if (stat.isDirectory()) {
          this.traverse(depFilePath, path.resolve(output, f), bar)
        } else if (path.extname(depFilePath) === '.vue') {
          this.clearGlobalState()
          this.transformOriginCode(parseComponent(fs.readFileSync(depFilePath, 'utf-8')), path.resolve(output, f))
          bar.tick()
        } else {
          const outputPath = path.resolve(output, f)
          rmAndMkdirSync(path.dirname(outputPath), outputPath)
          fs.writeFileSync(outputPath, fs.readFileSync(depFilePath, 'utf-8'), 'utf-8')
        }
      })
    })
  } catch(error) {
    console.log(chalk.red(new Error(error)))
    process.exit(1)
  }
}