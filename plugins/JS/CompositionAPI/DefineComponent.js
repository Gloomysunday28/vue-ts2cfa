const Setup = require('./Setup')
const Props = require('./Props')
const Data = require('./Data')
const Provide = require('./Provide')
const Inject = require('./Inject')
const Name = require('./Name')
const Filters = require('./Filters')
const Mixins = require('./Mixins')
const Directives = require('./Directives')
const Computed = require('./Computed')
const Methods = require('./Methods')
const Hooks = require('./Hooks')
const Watch = require('./Watch')
const Components = require('./Components')
const Model = require('./Model')
const Render = require('./Render')
module.exports = function DefineComponent(template) {
  return template.ast(`defineComponent({
    ${Name(template)}
    ${Components((template))}
    ${Directives(template)}
    ${Mixins(template)}
    ${Filters(template)}
    ${Model(template)}
    ${Setup(template)}
    ${Props(template)}
    ${Computed(template)}
    ${Data(template)}
    ${Provide(template)}
    ${Inject(template)}
    ${Hooks(template)}
    ${Methods(template)}
    ${Watch(template)}
    ${Render()}
  })`, {
    plugins: ['typescript', 'jsx'],
    preserveComments: true
  })
}