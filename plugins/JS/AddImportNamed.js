const { hasImportNamed } = require('../../utils')
const t = require('@babel/types')

module.exports = function(name) {
  if (hasImportNamed(name)) return
  
  const specifier = t.importSpecifier(t.identifier(name), t.identifier(name))
  global.ImportCompositionApiAST.specifiers.push(specifier)
}