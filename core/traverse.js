const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const { parseComponent } = require('vue-template-compiler')

/**
 * @description
 *  递归循环对应的文件
 * @param {string} filePath 解析的文件夹路径
 * @returns {undefined}
 */
module.exports = function traverseCode(filePath, output) {
  try {
    fs.readdir(filePath, (error, files) => {
      if (error) throw error
      
      files.forEach(f => {
        const depFilePath = path.resolve(filePath, f)
        const stat = fs.statSync(depFilePath)
        if (stat.isDirectory()) {
          this.traverse(depFilePath, path.resolve(output, f))
        } else if (path.extname(depFilePath) === '.vue') {
          console.log(depFilePath)
          console.log('output', output)
          console.log(f)
          this.clearGlobalState()
          this.transformOriginCode(parseComponent(fs.readFileSync(depFilePath, 'utf-8')), path.resolve(output, f))
        }
      })
    })
  } catch(error) {
    console.log(chalk.red(new Error(error)))
    process.exit(1)
  }
}