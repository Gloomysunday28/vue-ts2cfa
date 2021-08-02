/**
 * @description
 *  收集Props, 更新Props的用法
 */
module.exports = function Props() {
  const { prop } = global.options

  return `
    props: {
      ${prop.map(pData => {
        return `${pData.name}: ${pData.arguments}`
      })}
    }
  `
}