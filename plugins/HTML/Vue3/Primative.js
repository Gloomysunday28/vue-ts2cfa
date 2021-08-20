/**
 * @description
 * <template v-for="xxx">
 *  <div :key="xx.id"></div>
 * </template>
 * 变更为
 * <div v-for="xxx" :key="dccc"></div>
 */
 module.exports = function Primative() {
  return function(tree) {
    tree.match({
      attrs: {
        'v-else': true
      }
    }, node => {
      node.attrs['v-else'] = true
      return node
    })
  }
}