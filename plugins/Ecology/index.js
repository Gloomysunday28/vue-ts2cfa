const types = require('@babel/types')
const template = require('@babel/template').default
const Program = require('./Program')
const ImportDeclaration = require('./ImportDeclaration')
const ExpressionStatement = require('./ExpressionStatement')

module.exports = function(filename) {
  return {
    ...Program({ template, t: types }),
    ...ImportDeclaration({ template, t: types }),
    ...ExpressionStatement({ template, t: types }, filename),
  }
}