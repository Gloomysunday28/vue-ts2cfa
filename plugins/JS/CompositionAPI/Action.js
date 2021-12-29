/**
 * @description
 *  收集MAction, 将其封装成methods使用
 */
 module.exports = function Action(action = global.options.action) {
  if (!action.length) return ''

  return `
    ${action.map(actionData => {
      const { module } = actionData
      return `${actionData.name}(...rest) {
        return this.$store.dispatch(${actionData.arguments}, ...rest)
      }`
    })},
  `
}