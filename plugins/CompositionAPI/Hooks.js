/**
 * @description
 *  收集Hooks, 更新Hooks的用法
 */
 module.exports = function Hooks() {
  const { hooks } = global.options
  if (!hooks.length) return ''

  const notConformCompositionAPI = hooks.filter(hook => !hook.conformCompositionAPI)
  
  const integrationHooks = {}
  notConformCompositionAPI.forEach(hook => {
    ;(integrationHooks[hook.name] || (integrationHooks[hook.name] = [])).push(hook)
  })

  return `
    ${Object.keys(integrationHooks).map(hook => {
      const hookFn = integrationHooks[hook]
      if (hookFn.length > 1) {
        return `${hook}: [${hookFn.map(fn => {
          return `function(${fn.params || ''}) ${fn.body}`
        }).join(',')}]`
      } else {
        const fn = hookFn[0]
        return `${fn.name}(${fn.params || ''}) ${fn.body}`
      }
    })},
  `
}