const generator = require('@babel/generator').default
const { lifeCycleHooks, componsitionAPIHooks } = require('../../utils/hooks')
const { transformHooksName } = require('../../utils')
/**
 * @description
 *  收集classBody下的变量
 * @param {ast} ast ClassProperty
 */
module.exports = function(classProperty) {
  classProperty.accessibility = undefined
  const name = classProperty.key.name // string
  const value = classProperty.value // ast
  const type = (value || {}).type
  const generatorValue = generator(value).code
  const typeAnnotation = generator(classProperty.typeAnnotation).code
  const code = generator(classProperty).code // string
  const decorators = classProperty.decorators
  
  if (decorators) { // @Prop / @Ref..等等属性装饰器
    decorators.forEach((decorator) => {
      const expression = decorator.expression
      const optionContainer = global.options[expression.callee.name.toLocaleLowerCase()]
      if (optionContainer) {
        optionContainer.push({ code, name, typeAnnotation, type, value: generatorValue, arguments: generator(expression.arguments[0]).code })
      }
    })
  } else {
    if (lifeCycleHooks.includes(name)) { // 考虑生命周期是数组的情况
      let hooksMap = null
      if (value.type === 'FunctionExpression') {
        hooksMap = [value]
      } else if (value.type === 'ArrayExpression') hooksMap = value.elements
      hooksMap.forEach(hook => {
        const conformCompositionAPI = componsitionAPIHooks.includes(name) // 是否符合compositionAPI lifeCycleHooks引入标准

        global.options.hooks.push({
          conformCompositionAPI,
          name: transformHooksName(name),
          body: generator(hook.body).code,
          params: hook.params.map(v => `${v.name}${v.typeAnnotation ? generator(v.typeAnnotation).code : ''}`).join(',')
        })
      })
    } else {
      global.options.setup.push({ code, name, typeAnnotation, type, value: generatorValue})
    }
  }
}