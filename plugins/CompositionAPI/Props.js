/**
 * @description
 *  收集Props, 更新Props的用法
 */
module.exports = function Props() {
  const { prop } = global.options
  if (!prop.length) return ''

  return `
    props: {
      ${prop.map(pData => {
        return `${pData.name}: ${pData.arguments || JSON.stringify({})}`
      })}
    },
  `
}