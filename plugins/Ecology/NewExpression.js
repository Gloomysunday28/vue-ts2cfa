/**
 * @description
 *  1. 转换createRouter
 *  2. 转换createStore
 * @param {ast} ast ast节点
 * @returns {ast} 转换后的ast节点
 */
 module.exports = function({ t }) {
  return {
    NewExpression(path) {
      const ast = path.node
      const callee = ast.callee
      const argument = ast.arguments

      if (callee.name === 'VueRouter') {
        path.replaceWith(
          t.callExpression(
            t.identifier('createRouter'),
            [t.objectExpression([
              t.objectProperty(
                t.identifier('history'),
                t.callExpression(
                  t.identifier('createWebHistory'),
                  []
                )
              ),
              ...argument[0].properties.filter(property => {
                return property.key.name !== 'mode'
              })
            ])]
          )
        )
      } else if (callee.type === 'MemberExpression' && callee.object.name === 'Vuex') {
        path.replaceWith(
          t.callExpression(
            t.identifier('createStore'),
            ast.arguments
          )
        )
      } else path.skip()
    }
  }
}
