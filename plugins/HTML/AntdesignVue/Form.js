const fbJson = require('fbbk-json')
const GeneratorError = require('../../../utils/error')

/**
 * @description
 *  收集v-decorator的数据，并且转换成ant-design-vue2.x的写法
 */
module.exports = function Form(output) {
  return function (tree) {
    try {
      tree.match({
        tag: 'a-form-item'
      }, formItem => {
        const node = formItem.content.find(v => typeof v === 'object')
        const { 'v-decorator': decorator = ''} = node.attrs || {}
        const key = decorator.replace(/\[/, '').replace(/\]/, '').split(/,/)[0].replace(/\'/g, '').trim()
  
        if (decorator && !key.startsWith('{')) {
          (formItem.attrs || (formItem.attrs = {})).name=`${key}`
          const options = decorator.replace(/[\'\`](.)*[\`\']\,/g, '').trim()
          global.options.rules[key] = fbJson.parse(options.replace(/initialValue:\s+(.)*/, function(_c) {
            node.attrs['v-model']= _c.replace(/initialValue:\s+/, '')
            return ''
          }))
        }
  
        node.attrs['v-decorator'] = false
        formItem.content[1] = node
        
        return formItem
      })
    } catch(error) {
      GeneratorError(new Error(error), output)
    }
   
    tree.match({
      tag: 'a-form'
    }, node => {
      if (!node.attrs) {
        node.attrs = {
          ref: 'formRef'
        }
      } else if (!node.attrs.ref) {
        node.attrs.ref = 'formRef'
      }

      global.options.formRef = node.attrs.ref
      node.attrs[':rules'] = 'rules'
      node.attrs.form = false
      return node
    })
  }
}