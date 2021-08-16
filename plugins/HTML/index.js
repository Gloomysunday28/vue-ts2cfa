const { parser } = require('posthtml-parser')
const { render } = require('posthtml-render')

module.exports = function(content) {
  const ast = parser(content)
  console.log('ast', ast)
}