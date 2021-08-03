const Mutation = require('./Mutation')

/**
 * @description
 *  收集Methods, 更新Methods的用法
 */
 module.exports = function Methods() {
  const { methods } = global.options

  const mutationMethods = Mutation()
  if (!mutationMethods && !methods.length) return ''

  return `
    methods: {
      ${mutationMethods}
      ${methods.map(v => v.code).join(',')}
    },
  `
}