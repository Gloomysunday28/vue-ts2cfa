/**
 * @description
 *  1. 删除Vue.config.productionTip = false; 原因: https://v3.cn.vuejs.org/guide/migration/global-api.html#config-productiontip-%E7%A7%BB%E9%99%A4
 * @param {ast} ast ast节点
 * @returns {ast} 转换后的ast节点
 */
 module.exports = function({ t }) {
  return {
    AssignmentExpression(path) {
      const ast = path.node
      const left = ast.left

      if (left.type === 'MemberExpression' && left.property.name === 'productionTip') {
        path.remove()
      }
    }
  }
}
