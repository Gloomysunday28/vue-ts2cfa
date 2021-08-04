const t = require('@babel/types')
const generator = require('@babel/generator').default
const { lifeCycleHooks } = require('../../utils/hooks')
const { isObject } = require('../../utils')

module.exports = function Decorator(path, template) {
  const callee = path.expression.callee
  const arguments = path.expression.arguments

  if (callee.name === 'Component') {
    arguments.forEach((arg) => {
      arg.properties.forEach(pro => {
        const { name } = pro.key
        switch (name) {
          case 'name':
          case 'directives':
          case 'filters':
          case 'components':
            pro.trailingComments = undefined
            global.options[name] = generator(pro).code
            break
          case 'data':
            pro.trailingComments = undefined
            const data = global.options.data
            if (data.length) {
              pro.body.body.unshift(...data.map(v => template.ast(`let ${v.code}`, { plugins: ['typescript', 'jsx'] })))
              const returnStatement = pro.body.body.find(v => v.type === 'ReturnStatement')
              returnStatement.argument.properties.push(...data.map(v => t.objectProperty(t.identifier(v.name), t.identifier(v.identifier))))
            }
            global.options[name] = generator(pro).code
            break
          case 'mixins':
            const mixins = pro.value.elements.map(v => v.value)
            if (global.options.mixins) {
              mixins.push(...global.options.mixins)
            }

            global.options.mixins = mixins
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
                    body: methods ? generator(el.body).code : (isObject(type) ? generator(el).code : el.value),
                    conformMethods: methods,
                    conformObject: isObject(type),
                    fromCompoent: true
                  }
                }))
              } else {
                watchFn.push({
                  async: watch.async,
                  name: watch.key.name,
                  params,
                  body: methods ? generator(watch.body).code : (isObject(type) ? generator(value).code : value.value),
                  conformMethods: methods,
                  conformObject: isObject(type),
                  fromCompoent: true
                })
              }

              global.options.watch.push({
                key,
                watchFn,
                fromCompoent: true
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
