const Mutation = require('./Mutation')
const Action = require('./Action')
const Emit = require('./Emit')
/**
 * @description
 *  收集Methods, 更新Methods的用法
 */
 module.exports = function Methods(template, customSpace) {
  const { mutation: customMutation, action: customAction } = customSpace
  const { methods, watch } = global.options

  const tidyWatch = watch.filter(v => !v.fromCompoent)
  const mutationMethods = Mutation()
  const actionMethods = Action()
  const emitMethods = Emit(template)
  if (!customMutation && !customAction && !tidyWatch.length && !emitMethods && !actionMethods && !mutationMethods && !methods.length) return ''
  return `
    methods: {
      ${mutationMethods}
      ${actionMethods}
      ${customMutation}
      ${customAction}
      ${emitMethods}
      ${methods.length ? methods.map(v => v.code) + ',' : ''}
      ${tidyWatch.map(v => {
        const { watchFn } = v
        return watchFn.map(watch => {
          return `${watch.async ? 'async ' : ''} ${watch.name || ''}(${watch.params ||''})${watch.returnType || ''} ${watch.body}`
        }).join(',')
      }).join(',')}
    },
  `
}