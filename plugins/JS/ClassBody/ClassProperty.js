const t = require('@babel/types')
const generator = require('@babel/generator').default
const { lifeCycleHooks } = require('../../../utils/hooks')
const { transformHooksName } = require('../../../utils')

/**
 * @description
 *  收集classBody下的变量
 * @param {ast} ast ClassProperty
 */
module.exports = function(classProperty, path) {
  classProperty.accessibility = undefined
  classProperty.readonly = false
  classProperty.optional = false
  const name = classProperty.key.name // string
  const value = classProperty.value // ast
  const type = (value || {}).type
  const generatorValue = generator(value).code
  const code = generator(classProperty).code // string
  const decorators = classProperty.decorators
  let typeAnnotation = generator(classProperty.typeAnnotation).code
  
  if (decorators) { // @Prop / @Ref..等等属性装饰器
    decorators.forEach((decorator) => {
      const expression = decorator.expression
      const localeLowerCaseName = t.isIdentifier(expression) ? expression.name : expression.callee.name.toLocaleLowerCase()
      const optionContainer = global.options[localeLowerCaseName]
      if (optionContainer) {
        if (localeLowerCaseName === 'ref') {
          const typeName = classProperty.typeAnnotation.typeAnnotation.typeName
          if (typeName) {
            classProperty.typeAnnotation.typeAnnotation = t.tsTypeQuery(t.identifier(typeName.name))
            typeAnnotation = generator(classProperty.typeAnnotation).code
          }
        }
        optionContainer.push({ code, name, typeAnnotation, type, value: generatorValue, arguments: generator(expression.arguments[0]).code, restArguments: expression.arguments.slice(1) })
      } else {
        switch (localeLowerCaseName) {
          case 'propsync':
            global.options.prop.push({ computedName: name, name: expression.arguments[0].value, arguments: generator(expression.arguments[1]).code })
            break
          default:
            break
        }
      }
    })
    console.log('options', global.options)
  } else {
    if (lifeCycleHooks.includes(name)) { // 考虑生命周期是数组的情况
      let hooksMap = null
      if (value.type === 'FunctionExpression') {
        hooksMap = [value]
      } else if (value.type === 'ArrayExpression') hooksMap = value.elements

      hooksMap.forEach(hook => {
        const code = generator(hook.body).code

        global.options.hooks.push({
          async: hook.async,
          name: transformHooksName(name),
          body: code,
          params: hook.params.map(v => `${v.name}${v.typeAnnotation ? generator(v.typeAnnotation).code : ''}`).join(',')
        })
      })
    } else {
      classProperty.key.name = path.scope.generateUidIdentifier(name).name
      global.options.setup.push({ ast: classProperty, code: generator(classProperty).code, identifier: classProperty.key.name, name, typeAnnotation, type, value: generatorValue})
    }
  }
}