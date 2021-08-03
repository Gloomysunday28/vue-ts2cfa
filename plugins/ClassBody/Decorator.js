const generator = require('@babel/generator').default
const { lifeCycleHooks } = require('../../utils/hooks')

module.exports = function Decorator(path) {
  const callee = path.expression.callee
  const arguments = path.expression.arguments

  if (callee.name === 'Component') {
    arguments.forEach((arg) => {
      arg.properties.forEach(pro => {
        const { name } = pro.key
        switch (name) {
          case 'name':
          case 'directives':
          case 'mixins':
          case 'filters':
          case 'components':
          case 'data':
            global.options[name] = generator(pro).code
            break
          case 'props':
            const properties = pro.value.properties[0]
            const keyName = properties.key.name // string
            global.options.prop.push({
              name: keyName,
              arguments: generator(properties.value).code
            })
            break
          case 'computed':
            global.options[name].push(...pro.value.properties.map(v => generator(v).code))
            break
          case 'methods':
            global.options[name].push({ code: pro.value.properties.map(v => generator(v).code) })
            break
          case 'watch':
            const watchProperties = pro.value.properties
            watchProperties.forEach(watch => {
              const value = watch.value || {}
              const key = watch.key.name
              const methods = watch.type === 'ObjectMethod'
              const type = value.type
              const params = (watch.params || []).map(v => `${v.name}${v.typeAnnotation ? generator(v.typeAnnotation).code : ''}`).join(',')
              const watchFn = []
              if (type === 'ArrayExpression') {
                const elements = value.elements
                watchFn.push(...elements.map(el => {
                  const type = el.type
                  const methods = type === 'FunctionExpression'
                  return {
                    async: el.async,
                    name: (el.id || {}).name,
                    params: (el.params || []).map(v => `${v.name}${v.typeAnnotation ? generator(v.typeAnnotation).code : ''}`).join(','),
                    body: methods ? generator(el.body).code : el.value,
                    conformMethods: methods
                  }
                }))
              } else {
                watchFn.push({
                  async: watch.async,
                  name: watch.key.name,
                  params,
                  body: methods ? generator(watch.body).code : value.value,
                  conformMethods: methods
                })
              }

              global.options.watch.push({
                key,
                watchFn
              })
            })

          default:
            if (lifeCycleHooks.includes(name)) {
              global.options.hooks.push({
                async: pro.async,
                name,
                body: generator(pro.body).code,
                params: pro.params.map(v => `${v.name}${v.typeAnnotation ? generator(v.typeAnnotation).code : ''}`).join(',')
              })
            }
            break
        }
      })
    })
  }
}
