/**
 * @description
 *  收集Mixins, 更新Mixins的用法
 */
 module.exports = function Mixins() {
  const { mixins } = global.options

  return mixins.length ? `
    mixins: [${mixins.join(',')}],
  ` : ''
}