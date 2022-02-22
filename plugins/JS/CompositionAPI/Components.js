const t = require('@babel/types')

const generator = require('@babel/generator').default

/**
 * @description
 *  收集Data, 更新Data的用法
 */
 module.exports = function Components() {
  let { components } = global.options
  console.log('co', components)
  if (global.options.icons.length && !components) {
    const path = t.ObjectProperty(t.identifier('components'), t.objectExpression(global.options.icons.map(v => {
      return t.ObjectProperty(t.identifier(v), t.identifier('_' + v))
    })))
    // const path = t.ast(`
    //   componenst: {
    //     ${global.options.icons.map(icon => {
    //       return `${icon}: _${icon}`
    //     }).join(',')}
    //   }
    // `)

    components = generator(path).code
  }
  return components ? components + ',' : ''
}
