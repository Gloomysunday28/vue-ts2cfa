/**
 * @description
 *  1. 转换Vue.prototype 变为app.config.globalProperties
 * @param {ast} ast ast节点
 * @returns {ast} 转换后的ast节点
 */
 module.exports = function({ t }) {
  return {
    MemberExpression(path) {
      const ast = path.node
      const object = ast.object
      const property = ast.property

      if (property.name === 'prototype' && object.name === 'Vue') {
        path.replaceWith(
          t.memberExpression(
            t.memberExpression(
              t.identifier('app'),
              t.identifier('config')
            ),
            t.identifier('globalProperties')
          )
        )
      }
    }
  }
}
