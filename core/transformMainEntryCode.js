const path = require('path')
const fs = require('fs')
const parser = require('@babel/parser')
const traverse  = require('@babel/traverse').default
const generator = require('@babel/generator').default
const transformPlugin = require('../plugins/Ecology')
const { rmAndMkdirSync } = require('../utils/fs')
const GeneratorError = require('../utils/error')

/**
 * @description
 *   用于转换入口文件main源码中对应规则的代码
 * @param {string} code 源码字符
 * @returns {string} 返回转换后的代码
 */
module.exports = async function transformMainEntryCode(content, output) {
  try {
    // js转译
    const ast = parser.parse(content, {
      plugins: ['typescript', 'jsx'],
      sourceType: 'unambiguous'
    })
    traverse(ast, transformPlugin(path.basename(output)))
    const { code: transformCode } = generator(ast)
    rmAndMkdirSync(path.dirname(output), output)
    fs.writeFileSync(output, transformCode, 'utf-8')
  } catch(err) {
    console.log(error.stack)
    GeneratorError(new Error(error), output)
  }
}