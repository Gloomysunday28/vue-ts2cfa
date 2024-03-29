/**
 * @description
 *  收集Hooks, 更新Hooks的用法
 */
 module.exports = function Hooks() {
  const { hooks } = global.options
  const notConformCompositionAPI = hooks.filter(hook => !hook.conformCompositionAPI)
  if (!notConformCompositionAPI.length) return ''
  
  const integrationHooks = {}
  notConformCompositionAPI.forEach(hook => {
    ;(integrationHooks[hook.name] || (integrationHooks[hook.name] = [])).push(hook)
  })

  return `
    ${Object.keys(integrationHooks).map(hook => {
      const hookFn = integrationHooks[hook]
      if (hookFn.length > 1) {
        return `${hook}: [${hookFn.map(fn => {
          return `${fn.async ? 'async ': ''}function(${fn.params || ''}) ${fn.body}`
        }).join(',')}]`
      } else {
        const fn = hookFn[0]
        return `${fn.async ? 'async ': ''}${fn.name}(${fn.params || ''}) ${fn.body}`
      }
    })},
  `
}