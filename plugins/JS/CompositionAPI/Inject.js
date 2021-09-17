/**
 * @description
 *  收集Ref, 将其封装成computed使用
 */
 module.exports = function Provide() {
  const {inject } = global.options
  if (!inject.length) return ''

  return `
    inject() {
      ${inject.map((p) => {
        const { name, arguments, typeAnnotation } = p

        return `let ${name}${typeAnnotation} = ${arguments || JSON.stringify(name)}`
      }).join('\n')}

      return {
        ${inject.map((p) => {
          const { name } = p
          return name
        }).join(',\n')}
      }
    },
  `
}