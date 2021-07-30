/**
 * @description
 *  收集Props, 更新Props的用法
 */
module.exports = function Props() {
  const { prop } = global.options
  console.log(prop)
  return `
    props: {
      ${prop.map(pData => {
        return `${pData.name}: ${pData.arguments}`
      })}
    }
  `
}