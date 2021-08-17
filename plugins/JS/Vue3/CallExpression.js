const t = require('@babel/types')
const { transformEventName } = require('../../../utils')

/**
 * @description
 *  1. 将$listeners更改成$attrs
 *  2. 删除$set函数，变更为普通的赋值
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
    } else {
      const property = callee.property
      if (property.name === '$listeners') {
        property.name = '$attrs'
        callee.property.name = transformEventName(callee.property.name)
      }
      
      if (property.name === '$set') {
        const argument =  CallExpressionAST.arguments
        const ast = t.assignmentExpression('=', t.memberExpression(argument[0], t.identifier(argument[1].value)), argument[2])
        path.replaceWith(ast)
       }
    }
  }
}