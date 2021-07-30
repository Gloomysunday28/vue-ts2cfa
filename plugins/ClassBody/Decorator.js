const generator = require('@babel/generator').default

module.exports = function Decorator(path) {
  const callee = path.expression.callee
  const arguments = path.expression.arguments

  if (callee.name === 'Component') {
    arguments.forEach((arg) => {
      arg.properties.forEach(pro => {
        switch (pro.key.name) {
          case 'data':
            global.options.data = generator(pro).code
            break
          case 'props':
            const properties = pro.value.properties[0]
            const name = properties.key.name // string
            global.options.prop.push({
              name,
              arguments: generator(properties.value).code
            })
            break
          default:
            break
        }
      })
    })
  }
}
