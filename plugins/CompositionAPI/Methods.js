const Mutation = require('./Mutation')
const Emit = require('./Emit')

/**
 * @description
 *  收集Methods, 更新Methods的用法
 */
 module.exports = function Methods(template) {
  const { methods } = global.options

  const mutationMethods = Mutation()
  const emitMethods = Emit(template)
  if (!mutationMethods && !methods.length) return ''

  return `
    methods: {
      ${mutationMethods}
      ${emitMethods}
      ${methods.map(v => v.code).join(',')}
    },
  `
}