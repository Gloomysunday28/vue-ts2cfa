/**
 * @description
 *  添加composition-api包导入
 * @param {ast} ast ast节点
 * @returns {ast} 转换后的ast节点
 */
module.exports = function({ template }) {
  return {
    ImportDeclaration(path) {
      const source = path.node.source.value
      if (source === 'vue-property-decorator') {
        if (global.isDone) return path.skip()
        global.isDone = true
        const ast = template.ast(`import { defineComponent } from '@vue/composition-api'`)
        path.insertBefore(ast)
        global.ImportCompositionApiAST = ast
        path.remove()
      } else path.skip()

      if (source === 'vuex-class') {
        path.remove()
      }
    }
  }
}