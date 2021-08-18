/**
 * @description
 * template处理slot的写法
 *  <div slot="name" slot-scope="text, record"></div>
 *  <template #name="{text, record}">
 *  <div></div>
 * </template>
 */
module.exports = function TemplateSlots() {
  return function(tree) {
    tree.match({ attrs: {
      slot: true,
    } }, node => {
      const currentNode = {...node}
      const { slot, 'slot-scope': slotScope = ''} = currentNode.attrs || {}
     
      node.tag = 'template'
      node.attrs = {
        [`#${slot}`]: slotScope ? `{
          ${slotScope}
        }` : true,
      }
      
      node.content = [{
        tag: currentNode.tag,
        attrs: {
          ...currentNode.attrs,
          slot: undefined,
          'slot-scope': undefined,
        },
        content: currentNode.content
      }]

      return node
    })
  }
}