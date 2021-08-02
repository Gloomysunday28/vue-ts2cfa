const Setup = require('./Setup')
const Props = require('./Props')
const Data = require('./Data')
const Name = require('./Name')
const Filters = require('./Filters')
const Mixins = require('./Mixins')
const Directives = require('./Directives')
const Computed = require('./Computed')
const Methods = require('./Methods')
const Hooks = require('./Hooks')
const Watch = require('./Watch')

module.exports = function DefineComponent(template) {
  return template.ast(`defineComponent({
    ${Name(template)}
    ${Directives(template)}
    ${Mixins(template)}
    ${Filters(template)}
    ${Setup(template)}
    ${Props(template)}
    ${Computed(template)}
    ${Data(template)}
    ${Hooks(template)}
    ${Methods(template)}
    ${Watch(template)}
  })`, {
    plugins: ['typescript', 'jsx']
  })
}