const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const { parseComponent } = require('vue-template-compiler')

/**
 * @description
 *  递归循环对应的文件
 * @param {string} entry 解析的文件夹路径
 * @returns {undefined}
 */
module.exports = function traverseCode(entry) {
  try {
    fs.readFile(entry, (error, files) => {
      if (error) throw 1

      // files.forEach()
    })
  } catch(error) {
    console.log(chalk.red(new Error(error)))
    process.exit(1)
  }
}