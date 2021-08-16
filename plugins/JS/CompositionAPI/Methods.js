const Mutation = require('./Mutation')
const Emit = require('./Emit')

/**
 * @description
 *  收集Methods, 更新Methods的用法
 */
 module.exports = function Methods(template) {
  const { methods, watch } = global.options

  const tidyWatch = watch.filter(v => !v.fromCompoent)
  const mutationMethods = Mutation()
  const emitMethods = Emit(template)
  if (!tidyWatch.length && !emitMethods && !mutationMethods && !methods.length) return ''

  return `
    methods: {
      ${mutationMethods}
      ${emitMethods}
      ${methods.length ? methods.map(v => v.code).join(',') + ',' : ''}
      ${tidyWatch.map(v => {
        const { watchFn } = v
        return watchFn.map(watch => {
          return `${watch.async ? 'async ' : ''} ${watch.name || ''}(${watch.params ||''})${watch.returnType || ''} ${watch.body}`
        }).join(',')
      }).join(',')}
    },
  `
}