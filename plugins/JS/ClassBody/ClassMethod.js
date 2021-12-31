const generator = require('@babel/generator').default
const { lifeCycleHooks } = require('../../../utils/hooks')
const { transformHooksName } = require('../../../utils')
const t = require('@babel/types')

/**
 * @description
 *  收集classBody下的方法，包含: computed(get) 和 methods
 * @param {ast} ast ClassMethod
 */
module.exports = function(classMethod) {
  classMethod.accessibility = undefined
  classMethod.trailingComments = undefined
  const { decorators, params, returnType/* 函数返回的ts类型 */, kind, key: { name } } = classMethod
  const value = classMethod.value // ast
  const type = (value || {}).type
  const generatorValue = generator(value, { comments: true }).code
  const typeAnnotation = generator(classMethod.typeAnnotation, { comments: true }).code
  const transformParams = params.map(v => `${v.name}${v.typeAnnotation ? generator(v.typeAnnotation).code : ''}`).join(', ')
  const methodBody = classMethod.body

  if (decorators) { // @Prop / @Ref..等等属性装饰器
    decorators.forEach((decorator) => {
      const expression = decorator.expression
      const optionContainer = global.options[expression.callee.name.toLocaleLowerCase()]
      const body = generator(methodBody, { comments: true }).code
      const options = expression.arguments.slice(1)
      const watchFn = [{
        async: classMethod.async,
        name,
        bodyAST: classMethod.body,
        body,
        decorator,
        conformMethods: true,
        paramsAst: params,
        params: transformParams,
        name,
        typeAnnotation,
        type,
        value: generatorValue,
        returnType: generator(returnType).code,
        options: options.map(op => (op.properties || []).map(v => generator(v).code).join(',')),
      }]
      if (optionContainer) {
        optionContainer.push({ watchFn, key: generator(expression.arguments[0]).code})
      }
    })
  } else {
    if (kind === 'get' || kind === 'set') {
      const code = generator(classMethod.body).code
      global.options.computed.push({ async: classMethod.async, name, code, kind, params: transformParams, returnType: generator(returnType).code })
    } else {
      if (lifeCycleHooks.includes(name)) {
        const hooksName = transformHooksName(name)
        const code = generator(classMethod.body).code
        global.options.hooks.push({ async: classMethod.async, name: hooksName, body: code, params: transformParams })
      } else {
        const code = generator(classMethod).code
        if (name === 'render') {
          global.options.render = code          
        } else if (name === 'constructor') {
          const superIndex = methodBody.body.findIndex(v => t.isSuper(v.expression.callee))
          if (~superIndex) methodBody.body.splice(superIndex, 1)
          global.options.hooks.push({ async: classMethod.async, name: 'created', body: generator(methodBody).code, params: transformParams })
        } else {
          global.options.methods.push({ code })
        }
      }
    }
  }
}