/**
 * @description
 *  添加composition-api包导入
 * @param {ast} ast ast节点
 * @returns {ast} 转换后的ast节点
 */
 module.exports = function({ t, template }) {
  return {
    ExpressionStatement(path) {
      const expression = path.node.expression
      if (expression) {
        const callee = expression.callee
        if (callee) {
          const object = callee.object
          if (object && object.name === 'Vue') {
            path.node.expression.callee.object.name = 'window.Vue'
          }
        }
      }
    }
  }
}