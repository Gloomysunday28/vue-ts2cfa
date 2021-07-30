const { isObject } = require('../../utils')  
const AddImportNamed = require('../AddImportNamed')  

module.exports = function Setup() {
  const { setup } = global.options
  return `
    setup() {
      ${setup.map(variable => {
        if (isObject(variable.type)) {
          AddImportNamed('reactive')

          return `let ${variable.name}${variable.typeAnnotation} = reactive(${variable.value})`
        }

        return `let ${variable.code}`
      }).join('\n')}

      return {
        ${setup.map(variable => {
          return variable.name
        }).join(',\n')}
      }
    }
  `
}