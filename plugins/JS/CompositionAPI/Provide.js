/**
 * @description
 *  收集Ref, 将其封装成computed使用
 */
 module.exports = function Provide() {
  const {provide } = global.options
  if (!provide.length) return ''

  return `
    provide() {
      return {
        ${provide.map((p) => {
          const { arguments, name } = p
          return `${arguments || name}: this.${name}`
        })}
      }
    },
  `
}