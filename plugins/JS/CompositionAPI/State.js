/**
 * @description
 *  收集Ref, 将其封装成computed使用
 */
 module.exports = function State() {
  const { state } = global.options
  if (!state.length) return ''

  return `
    ${state.map(stateData => {
      return `${stateData.name}() {
        const ${stateData.name}${stateData.typeAnnotation} = this.$store.state[${stateData.arguments}]
        return ${stateData.name}
      }`
    })},
  `
}