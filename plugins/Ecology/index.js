const types = require('@babel/types')
const template = require('@babel/template').default
const Program = require('./Program')
const ImportDeclaration = require('./ImportDeclaration')
const ExpressionStatement = require('./ExpressionStatement')
const NewExpression = require('./NewExpression')
const MemberExpression = require('./MemberExpression')
const AssignmentExpression = require('./AssignmentExpression')

const pluginsStrategy = new Map([
  [
    ['main', 'router', 'store'],
    (filename) => ({
      ...Program({ template, t: types }),
      ...ImportDeclaration({ template, t: types }),
      ...ExpressionStatement({ template, t: types }, filename.split('.')[0]),
      ...NewExpression({ template, t: types }, filename),
      ...MemberExpression({ template, t: types }, filename),
      ...AssignmentExpression({ template, t: types }, filename),
    })
  ], 
  [
    ['register'],
    (filename) => ({
      ...Program({ template, t: types }, filename)
    })
  ]
])

module.exports = function(filename) {
  for (let [key, plugins] of pluginsStrategy.entries()) {
    if (key.includes(filename.split('.')[0])) {
      return plugins(filename)
    }
  }
}