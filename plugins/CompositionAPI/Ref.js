/**
 * @description
 *  收集Ref, 将其封装成computed使用
 */
 module.exports = function Ref() {
  const { ref } = global.options

  return `
    ${ref.map(rData => {
      return `${rData.name}() {
        const ${rData.name}${rData.typeAnnotation} = this.$refs[${rData.arguments}]
        return ${rData.name}
      }`
    })}
  `
}