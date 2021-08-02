/**
 * @description
 *  收集Name, 更新Name的用法
 */
 module.exports = function Name() {
  const { name } = global.options

  return name ? name + ',' : ''
}