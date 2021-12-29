/**
 * @description
 *  收集自定义Namespace, 将其封装成methods使用
 */
const { toString } = require('../../../utils/lib')
const State = require('./State')
const Mutation = require('./Mutation')
const Action = require('./Action')
const Getter = require('./Getter')

function filterTrueSplit(customeASTTransform) {
  return customeASTTransform.filter(Boolean).join('')
}

 module.exports = function NameSpace() {
  let customASTs = []
  for (let key in global.options) {
    const value = global.options[key]
    if (toString(value) === '[object Object]' && value.custom) {
      customASTs.push(value)
    }
  }

  const customeASTTransform = customASTs.reduce((prev, cAST) => {
    const { state, mutation, action, getter } = cAST
    prev.state.push(State(state || []))
    prev.mutation.push(Mutation(mutation || []))
    prev.action.push(Action(action || []))
    prev.getter.push(Getter(getter || []))
    return prev
  }, {
    state: [],
    mutation: [],
    action: [],
    getter: []
  })

  return {
    state: filterTrueSplit(customeASTTransform.state),
    mutation: filterTrueSplit(customeASTTransform.mutation),
    action: filterTrueSplit(customeASTTransform.action),
    getter: filterTrueSplit(customeASTTransform.getter),
  }
}