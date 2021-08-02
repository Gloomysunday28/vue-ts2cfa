const generator = require('@babel/generator').default
const { lifeCycleHooks, componsitionAPIHooks } = require('../../utils/hooks')
const { transformHooksName } = require('../../utils')

/**
 * @description
 *  收集classBody下的方法，包含: computed(get) 和 methods
 * @param {ast} ast ClassMethod
 */
module.exports = function(classMethod) {
  const { params, kind, key: { name } } = classMethod
  if (kind === 'get' || kind === 'set') {
    const code = generator(classMethod.body).code
    global.options.computed.push({ name, code, kind, params: params.map(v => v.name).join(', ') })
  } else {
    if (lifeCycleHooks.includes(name)) {
      const hooksName = transformHooksName(name)
      const code = generator(classMethod.body).code
      global.options.hooks.push({ conformCompositionAPI: componsitionAPIHooks.includes(name)/* 是否符合compositionAPI lifeCycleHooks引入标准 */, name: hooksName, body: code, params: classMethod.params.map(v => v.name).join(',') })
    } else {
      const code = generator(classMethod).code
      global.options.methods.push({ code })
    }
  }
}