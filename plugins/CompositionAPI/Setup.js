const { isObject } = require('../../utils')  
const AddImportNamed = require('../AddImportNamed') // 按需引入API 

module.exports = function Setup() {
  const { setup, hooks } = global.options
  const compositionHooks = hooks.filter(hook => hook.conformCompositionAPI)
  if (!setup.length && !compositionHooks.length) return ''
  if (compositionHooks.length) {
    compositionHooks.forEach(hook => {
      AddImportNamed(hook.name)
    })
  }

  return `
    setup(props, context) {
      ${setup.map(variable => {
        if (isObject(variable.type)) {
          AddImportNamed('reactive')

          return `let ${variable.name}${variable.typeAnnotation} = reactive(${variable.value})`
        }

        return `let ${variable.code}`
      }).join('\n')}

      ${compositionHooks.map(hook => { // 收集class下的hooks
        return `${hook.name}(${hook.async ? 'async ' : ''}function(${hook.params.value || ''}) ${hook.body})`
      }).join('\n')}

      return {
        ${setup.map(variable => {
          return variable.name
        }).join(',\n')}
      }
    },
  `
}