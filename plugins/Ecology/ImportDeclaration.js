/**
 * @description
 *  添加composition-api包导入
 * @param {ast} ast ast节点
 * @returns {ast} 转换后的ast节点
 */

 const sourceMap = ['vue', 'vue-router', 'vuex']

 module.exports = function({ t }) {
  function addImportName(specifiers, importNames) {
    importNames = Array.isArray(importNames) ? importNames : [importNames]
    importNames.forEach(key => {
      specifiers.push(t.importSpecifier(t.identifier(key), t.identifier(key)))
    })
  }
  
  return {
    ImportDeclaration(path) {
      const ast = path.node
      const source = ast.source.value
      const importSource = sourceMap.find(v => v === source) || ''

      if (importSource) {
        const index = ast.specifiers.findIndex(specifier => specifier.type === 'ImportDefaultSpecifier')
        if (~index) {
          ast.specifiers.splice(index, 1)
        }
      }
      
      if (source === 'vue') {
        addImportName(ast.specifiers, 'createApp')
      } else if (source === 'vue-router') {
        addImportName(ast.specifiers, ['createRouter', 'createWebHistory'])
      } else if (source === 'vuex') {
        addImportName(ast.specifiers, 'createStore')
      } else if (source.includes('register')) {
        ast.specifiers = [t.importDefaultSpecifier(t.identifier('register'))]
      }
    }
  }
}