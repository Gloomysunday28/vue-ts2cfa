const fs = require('fs')
const path = require('path')

/**
 * @description
 *  编译时遇到的错误会在parseError/error.log下展示
 * @param {*} error 错误信息
 * @param {*} output 输出路径
 */
module.exports = function GeneratorError(error, output) {
  const ERROR_PATH = path.resolve(process.cwd(), 'parseError/error.log')
  if (fs.existsSync(ERROR_PATH)) {
    fs.appendFileSync(ERROR_PATH, '\n' + `Error:\n ${output}: ${error.stack}`)
  } else {
    try {
      fs.mkdirSync(path.resolve(process.cwd(), 'parseError'))
    } catch(err) {
    }
    fs.appendFileSync(ERROR_PATH, '\n' + `Error:\n ${output}: ${error.stack}`)
  }
}