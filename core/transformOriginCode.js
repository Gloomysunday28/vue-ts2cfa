const path = require('path')
const fs = require('fs')
const parser = require('@babel/parser')
const traverse  = require('@babel/traverse').default
const generator = require('@babel/generator').default
const transformPlugin = require('../plugins')
const getTemplate = require('./template')
const { rmAndMkdirSync } = require('../utils/fs')

/**
 * @description
 *   用于转换源码中对应规则的代码
 * @param {string} code 源码字符
 * @returns {string} 返回转换后的代码
 */
module.exports = function transformOriginCode(vueCompiler, output) {
  const { script: { content, attrs }, template = {}, styles = {} } = vueCompiler
  const ast = parser.parse(content, {
    plugins: ['decorators-legacy', 'typescript', 'jsx'],
    sourceType: 'unambiguous'
  })

  traverse(ast, transformPlugin())

  const { code: transformCode } = generator(ast)
  const outputFileContent = getTemplate(template ? template.content : '', { attrs, transformCode}, styles || '')
  
  rmAndMkdirSync(path.dirname(output), output)
  
  fs.writeFileSync(output, outputFileContent, 'utf-8')
  return transformCode
}