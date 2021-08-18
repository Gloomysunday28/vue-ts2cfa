/**
 * @description
 *  vue2.x的写法
 *    <keep-alive>
 *       <router-view></router-view>
 *    </keep-alive>
 *  
 *   vue3.x的写法
 *    <router-view v-slot="{ Component }">
 *      <keep-alive>
 *        <component :is="Component"></component> 
 *      </keep-alive>
 *    </router-view>
 *   原因: router-view不再是一个函数式组件
 */

function changeAbstractComponent(node) {
  const children = (node.content || []).find(child => typeof child === 'object')

  if (children && children.tag === 'router-view') {
    const content = children.content
    var parentNode = {
      tag: children.tag,
      attrs: children.attrs || {},
    }

    parentNode.attrs['v-slot'] = '{ Component }'
    parentNode.content =  [
      '\n\t',
      { tag: node.tag, attrs: node.attrs, content: [
        '\n\t\t',
        { tag: 'component', attrs: { ':is': 'Component' }, content },
        '\n\t\t',
        ]
      },
      '\n\t'
    ]
  }

  return parentNode || node
}

module.exports = function RouterViewAbstract() {
  return function(tree) {
    tree.match({
      tag: 'keep-alive'
    }, changeAbstractComponent)

    tree.match({
      tag: 'transition'
    }, changeAbstractComponent)
  }
}