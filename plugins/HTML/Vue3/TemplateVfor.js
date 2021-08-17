/**
 * @description
 * <template v-for="xxx">
 *  <div :key="xx.id"></div>
 * </template>
 * 变更为
 * <div v-for="xxx" :key="dccc"></div>
 */
 module.exports = function TemplateVfor() {
  return function(tree) {
    tree.match({ attrs: {
      'v-for': true,
    } }, node => {
      if (node.tag === 'template') {
        const children = node.content.find(children => {
          return typeof children === 'object'
        })

        if (children) {
          node.tag = children.tag
          node.attrs = {
            'v-for': node.attrs['v-for'],
            ...children.attrs
          },
          node.content = children.content
        }
      }

      return node
    })
  }
}