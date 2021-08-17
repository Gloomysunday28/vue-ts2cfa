const path = require('path')
const fs = require('fs')
const parser = require('@babel/parser')
const traverse  = require('@babel/traverse').default
const generator = require('@babel/generator').default
const transformPlugin = require('../plugins/JS')
const getTemplate = require('./template')
const { rmAndMkdirSync } = require('../utils/fs')
const transformHTML = require('../plugins/HTML')

/**
 * @description
 *   用于转换源码中对应规则的代码
 * @param {string} code 源码字符
 * @returns {string} 返回转换后的代码
 */
module.exports = async function transformOriginCode(vueCompiler, output, isTsx) {
  let content = '' // js内容
  let outputFileContent = '' // 转换后的js内容
  let attrs = {} // script标签的属性
  let transfromTemlate = '' // template内容
  if (isTsx) {
    content = vueCompiler
  } else {
    content = vueCompiler.script.content
    attrs = vueCompiler.script.attrs
  }

  // html转译
  if (isTsx) {
    transfromTemlate = vueCompiler
  } else {
    transfromTemlate = await transformHTML(vueCompiler.template.content )
  }

  // js转译
  const ast = parser.parse(content, {
    plugins: ['decorators-legacy', 'typescript', 'jsx'],
    sourceType: 'unambiguous'
  })

  traverse(ast, transformPlugin())
  
  const { code: transformCode } = generator(ast)
  outputFileContent = isTsx ? transformCode : getTemplate(vueCompiler.template ? transfromTemlate : '', { attrs, transformCode}, vueCompiler.styles || '')
  
  rmAndMkdirSync(path.dirname(output), output)

  fs.writeFileSync(output, outputFileContent, 'utf-8')
  return transformCode
}