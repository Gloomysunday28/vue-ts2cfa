const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const { parseComponent } = require('vue-template-compiler')
const { rmAndMkdirSync } = require('../utils/fs')
const GeneratorError = require('../utils/error')

const staticTemplatePath = path.resolve(process.cwd(), './static')
const pluginsOutVue = ['main', 'router', 'store']
try {
  var staticFiles = fs.readdirSync(staticTemplatePath)
}catch(error) {
  staticFiles = []
}

/**
 * @description
 *  递归循环对应的文件
 * @param {string} filePath 解析的文件夹路径
 * @returns {undefined}
 */

async function loopFile(files, filePath, output, bar) {
  for (let f of files) {
    const depFilePath = path.resolve(filePath, f)
    const stat = fs.statSync(depFilePath)
    const basename = path.basename(depFilePath)
    const outputPath = path.resolve(output, f)
    
    this.clearGlobalState()
    if (stat.isDirectory()) {
      this.traverse(depFilePath, path.resolve(output, f), bar)
    } else if (path.extname(depFilePath) === '.vue') {
      await this.transformOriginCode(parseComponent(fs.readFileSync(depFilePath, 'utf-8')), outputPath)
      bar.tick()
    } else if (path.extname(depFilePath) === '.tsx') {
      await this.transformOriginCode(fs.readFileSync(depFilePath, 'utf-8' ), outputPath, true)
      bar.tick()
    } else {
      if (pluginsOutVue.includes(basename.split('.')[0])) {
        this.transformMainEntryCode(fs.readFileSync(depFilePath, 'utf-8' ), outputPath)
      } else {
        const outputPath = path.resolve(output, f)
        rmAndMkdirSync(path.dirname(outputPath), outputPath)

        if (staticFiles.includes(basename)) {
          fs.writeFileSync(outputPath, fs.readFileSync(path.resolve(staticTemplatePath, basename)), 'utf-8')
        } else {
          fs.writeFileSync(outputPath, fs.readFileSync(depFilePath, 'utf-8'), 'utf-8')
        }
      }
    }
  }
}

module.exports = function traverseCode(filePath, output, bar) {
  try {
    fs.readdir(filePath, (error, files) => {
      if (error) throw error
      
      loopFile.call(this, files, filePath, output, bar)
    })
  } catch(error) {
    GeneratorError(new Error(error.stack), output)
    process.exit(1)
  }
}