/**
 * @description
 *  收集Model, 更新Model的用法
 */
 module.exports = function Model() {
  const { model } = global.options
  if (!model.length) return ''
  
  const models = model[0]
  return `
    model: {
      prop: ${models.name ? JSON.stringify(models.name) : 'value'},
      event: ${models.arguments}
    },
  `
}