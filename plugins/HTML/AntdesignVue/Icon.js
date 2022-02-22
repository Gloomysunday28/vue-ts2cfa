const GeneratorError = require('../../../utils/error')

/**
 * @description
 *  收集a-icon的标签，并且转换成ant-design-vue2.x的写法
 */
module.exports = function Icon(output) {
  return function (tree) {
    try {
      tree.match({
        tag: 'a-icon'
      }, node => {
        const { type = '' } = node.attrs || {}
        const IconName = type.split('-').map((v) => {
          return v.slice(0, 1).toUpperCase() + v.slice(1)
        }).join('') + 'Outlined'
        global.options.icons.push(IconName)
        node.tag = IconName
        ;(node.attrs || {}).type = false
        
        return node
      })
    } catch(error) {
      GeneratorError(new Error(error.stack), output)
    }
  }
}