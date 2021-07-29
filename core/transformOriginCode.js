const parser = require('@babel/parser')
const traverse  = require('@babel/traverse').default
const generator = require('@babel/generator').default
const transformPlugin = require('../plugins')

/**
 * @description
 *   用于转换源码中对应规则的代码
 * @param {string} code 源码字符
 * @returns {string} 返回转换后的代码
 */
module.exports = function transformOriginCode(code) {
  const ast = parser.parse(code, {
    plugins: ['decorators-legacy', 'typescript'],
    sourceType: 'unambiguous'
  })

  traverse(ast, transformPlugin())

  const { code: transformCode } = generator(ast)
  console.log(transformCode)
  return transformCode
}