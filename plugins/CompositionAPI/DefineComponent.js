const Setup = require('./Setup')
const Props = require('./Props')
const Data = require('./Data')

module.exports = function DefineComponent(template) {
  return template.ast(`defineComponent({
    ${Setup(template)},
    ${Props(template)},
    ${Data(template)}
  })`, {
    plugins: ['typescript']
  })
}