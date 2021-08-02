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
          default:
            if (lifeCycleHooks.includes(name)) {
              global.options.hooks.push({
                name,
                body: generator(pro.body).code,
                params: pro.params.map(v => v.name).join(',')
              })
            }
            break
        }
      })
    })
  }
}
