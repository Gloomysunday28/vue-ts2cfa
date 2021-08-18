/**
 * @description
 *  添加composition-api包导入
 * @param {ast} ast ast节点
 * @returns {ast} 转换后的ast节点
 */
 module.exports = function({ t }) {
  return {
    ImportDeclaration(path) {
      const ast = path.node
      const source = ast.source.value
      if (source === 'vue') {
        const index = ast.specifiers.findIndex(specifier => specifier.type === 'ImportDefaultSpecifier' && specifier.local.name === 'Vue')
        if (~index) {
          ast.specifiers.splice(index, 1)
        }

        ast.specifiers.push(t.importSpecifier(t.identifier('createApp'), t.identifier('createApp')))
      } else path.skip()
    }
  }
}