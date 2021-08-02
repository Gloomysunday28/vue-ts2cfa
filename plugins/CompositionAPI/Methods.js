/**
 * @description
 *  收集Methods, 更新Methods的用法
 */
 module.exports = function Methods() {
  const { methods } = global.options

  return `
    methods: {
      ${methods.map(v => v.code).join(',')}
    }
  `
}