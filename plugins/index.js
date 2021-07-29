const template = require('@babel/template').default
const Program = require('./Program')
const ImportDeclaration = require('./ImportDeclaration')
const ExportDefaultDeclaration = require('./ExportDefaultDeclaration')

module.exports = function() {
  return {
    ...Program({ template }),
    ...ImportDeclaration({ template }),
    ...ExportDefaultDeclaration({ template }),
  }
}