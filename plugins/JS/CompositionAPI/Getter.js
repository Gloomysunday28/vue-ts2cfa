/**
 * @description
 *  收集Ref, 将其封装成computed使用
 */
 module.exports = function Getter(getter = global.options.getter) {
  if (!getter.length) return ''

  return `
    ${getter.map(getterData => {
      return `${getterData.name}() {
        const ${getterData.name}${getterData.typeAnnotation} = this.$store.getters[${getterData.arguments}]
        return ${getterData.name}
      }`
    })},
  `
}