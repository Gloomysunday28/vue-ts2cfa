/**
 * @description
 *  将ts书写的data属性转换成options.data写法
 * @param {ast} ast ast节点
 * @returns {ast} 转换后的ast节点
 */
module.exports = function({ template }) {
  return {
    ImportDeclaration(path) {
      if (global.isDone) return path.stop()
      global.isDone = true
      const ast = template.ast(`import { defineComponent } from '@vue/composition-api'`)
      path.insertBefore(ast)
    }
  }
}