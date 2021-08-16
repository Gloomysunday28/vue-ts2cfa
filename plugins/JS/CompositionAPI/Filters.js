/**
 * @description
 *  收集Filters, 更新Filters的用法
 */
 module.exports = function Filters() {
  const { filters } = global.options

  return filters ? filters + ',' : ''
}