const t = require('@babel/types')
const { transformEventName } = require('../../../utils')

/**
 * @description
 *  1. 将$listeners更改成$attrs
 *  2. 删除$set函数，变更为普通的赋值
 *  3. 更改this.$form.createForm(this)为this.formRef
 */
module.exports = function CallExpression(path) {
  const CallExpressionAST = path.node
  const callee = CallExpressionAST.callee
  if (t.isMemberExpression(callee)) {
    if (t.isMemberExpression(callee.object)) {
      const object = callee.object
      if (object.property.name === '$listeners') {
        object.property.name = '$attrs'
        callee.property.name = transformEventName(callee.property.name)
      }
      if (object.property.name === '_watcher') {
        object.property.name = '_'
      }

      if (object.property.name === '$form') {
        path.replaceWith(t.memberExpression(t.ThisExpression(), t.identifier('formRef')))
      }
    } else {
      const property = callee.property
      const name = property.name
      
      if (name === '$listeners') {
        property.name = '$attrs'
        callee.property.name = transformEventName(callee.property.name)
      }
      
      if (name === '$set') {
        const argument =  CallExpressionAST.arguments
        const ast = t.assignmentExpression('=', t.memberExpression(argument[0], t.identifier(argument[1].value)), argument[2])
        path.replaceWith(ast)
      }

      if (name === 'createForm') {
        path.replaceWith(t.memberExpression(t.ThisExpression(), t.identifier('formRef')))
      }
    }
  }
}