const types = require('@babel/types')
const template = require('@babel/template').default
const Program = require('./Program')
const ImportDeclaration = require('./ImportDeclaration')
const ExportDefaultDeclaration = require('./ExportDefaultDeclaration')

module.exports = function() {
  return {
    ...Program({ template, t: types }),
    ...ImportDeclaration({ template, t: types }),
    ...ExportDefaultDeclaration({ template, t: types }),
  }
}