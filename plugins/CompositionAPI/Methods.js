/**
 * @description
 *  收集Methods, 更新Methods的用法
 */
 module.exports = function Methods() {
  const { methods } = global.options
  if (!methods.length) return ''

  return `
    methods: {
      ${methods.map(v => v.code).join(',')}
    },
  `
}