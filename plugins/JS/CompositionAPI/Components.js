/**
 * @description
 *  收集Data, 更新Data的用法
 */
 module.exports = function Components() {
  const { components } = global.options

  return components ? components + ',' : ''
}
