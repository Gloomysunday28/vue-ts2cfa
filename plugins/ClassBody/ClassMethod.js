const generator = require('@babel/generator').default
const { lifeCycleHooks, componsitionAPIHooks } = require('../../utils/hooks')
const { transformHooksName } = require('../../utils')

/**
 * @description
 *  收集classBody下的方法，包含: computed(get) 和 methods
 * @param {ast} ast ClassMethod
 */
module.exports = function(classMethod) {
  const { decorators, params, kind, key: { name } } = classMethod
  const value = classMethod.value // ast
  const type = (value || {}).type
  const generatorValue = generator(value).code
  const typeAnnotation = generator(classMethod.typeAnnotation).code
  const transformParams = params.map(v => v.name).join(', ')
  
  if (decorators) { // @Prop / @Ref..等等属性装饰器
    decorators.forEach((decorator) => {
      const expression = decorator.expression
      const optionContainer = global.options[expression.callee.name.toLocaleLowerCase()]
      const body = generator(classMethod.body).code
      const watchFn = [{
        name,
        body,
        conformMethods: true,
        params: transformParams, name, typeAnnotation, type, value: generatorValue
      }]
      optionContainer.push({ watchFn, key: generator(expression.arguments[0]).code })
    })
  } else {
    if (kind === 'get' || kind === 'set') {
      const code = generator(classMethod.body).code
      global.options.computed.push({ name, code, kind, params: transformParams })
    } else {
      if (lifeCycleHooks.includes(name)) {
        const hooksName = transformHooksName(name)
        const code = generator(classMethod.body).code
        global.options.hooks.push({ conformCompositionAPI: componsitionAPIHooks.includes(name)/* 是否符合compositionAPI lifeCycleHooks引入标准 */, name: hooksName, body: code, params: transformParams })
      } else {
        const code = generator(classMethod).code
        global.options.methods.push({ code })
      }
    }
  }
}