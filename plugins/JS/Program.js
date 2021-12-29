/**
 * @description
 *  将ts书写的data属性转换成options.data写法
 * @param {ast} ast ast节点
 * @returns {ast} 转换后的ast节点
 */
module.exports = function() {
  return {
    Program(path) {
      global.rootpath = path

      let hasVuexClass = false
      path.traverse({
        ImportDeclaration(iPath) {
          const { source = {}, specifiers } = iPath.node
          if (source.value === 'vuex-class' && specifiers.some(v => v.local.name === 'namespace')) {
            hasVuexClass = true
            iPath.remove()
          }
        },
        VariableDeclaration(cPath) {
          const { declarations } = cPath.node
          for (node of declarations) {
            const  { name: variable } = node.id
            const { callee: { name } = {}, arguments } = node.init
            if (hasVuexClass && name === 'namespace') {
              global.options[variable] = {
                custom: true,
                module: arguments[0]?.value
              }
              cPath.remove()
            }
          }
        }
      })
    }
  }
}