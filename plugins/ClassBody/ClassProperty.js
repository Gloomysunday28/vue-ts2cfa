const generator = require('@babel/generator').default

/**
 * @description
 *  收集classBody下的变量
 * @param {ast} ast ClassProperty
 */
module.exports = function(classProperty) {
  const name = classProperty.key.name // string
  const value = classProperty.value // ast
  const type = (value || {}).type
  const generatorValue = generator(value).code
  const typeAnnotation = generator(classProperty.typeAnnotation).code
  const code = generator(classProperty).code // string
  const decorators = classProperty.decorators
  
  if (decorators) {
    decorators.forEach((decorator) => {
      const expression = decorator.expression
      const optionContainer = global.options[expression.callee.name.toLocaleLowerCase()]
      optionContainer.push({ code, name, typeAnnotation, type, value: generatorValue, arguments: generator(expression.arguments[0]).code })
    })
  } else {
    global.options.setup.push({ code, name, typeAnnotation, type, value: generatorValue})
  }
}