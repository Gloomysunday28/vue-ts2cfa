/**
 * @description
 *  收集Ref, 将其封装成computed使用
 */
 module.exports = function State(state = global.options.state) {
  if (!state.length) return ''
  return `
    ${state.map(stateData => {
      const [module, states] = stateData.arguments.replace(/\"/g, '').split('/')
      return `${stateData.name}() {
        const ${stateData.name}${stateData.typeAnnotation} = this.$store.state${!states ? `[${stateData.arguments}]` : `.${module}.${states}`}
        return ${stateData.name}
      }`
    })},
  `
}