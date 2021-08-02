const path = require('path')
const fs = require('fs')
const parser = require('@babel/parser')
const traverse  = require('@babel/traverse').default
const generator = require('@babel/generator').default
const transformPlugin = require('../plugins')
const getTemplate = require('./template')

/**
 * @description
 *   用于转换源码中对应规则的代码
 * @param {string} code 源码字符
 * @returns {string} 返回转换后的代码
 */
module.exports = function transformOriginCode(vueCompiler, output) {
  const { script: { content, attrs }, template, styles } = vueCompiler
  const ast = parser.parse(content, {
    plugins: ['decorators-legacy', 'typescript', 'jsx'],
    sourceType: 'unambiguous'
  })

  traverse(ast, transformPlugin())

  const { code: transformCode } = generator(ast)
  const outputFileContent = getTemplate(template.content, { attrs, transformCode}, styles)
  
  const dir = path.dirname(output)

  if (fs.existsSync(output)) {
    fs.rmSync(output)
  } else if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
  }
  
  fs.writeFileSync(output, outputFileContent, 'utf-8')
  return transformCode
}