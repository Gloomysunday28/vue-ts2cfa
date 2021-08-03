const generator = require('@babel/generator').default

/**
 * @description
 *  收集Props, 更新Props的用法
 */
module.exports = function Props() {
  const { prop, model } = global.options
  if (!prop.length && !model.length) return ''
  
  
  return `
    props: {
      ${prop.map(pData => {
        return `${pData.name}: ${pData.arguments || JSON.stringify({})}`
      }).join(',')}
      ${model.length ? (models = model[0], `
        ${models.name}: ${models.restArguments.length ? generator(models.restArguments[0]).code : ''}
      `) : ''}
    },
  `
}