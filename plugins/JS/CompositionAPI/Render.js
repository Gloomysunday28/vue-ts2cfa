/**
 * @description
 *  收集Render, 更新Render的用法
 */
 module.exports = function Name() {
  const { render } = global.options

  return render ? render + ',' : ''
}