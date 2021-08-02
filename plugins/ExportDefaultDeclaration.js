const DefineComponent = require('./CompositionAPI/DefineComponent')
const ClassMethod = require('./ClassBody/ClassMethod')
const ClassProperty = require('./ClassBody/ClassProperty')
const Decorator = require('./ClassBody/Decorator')

const handlerClassBodyMap = {
  ClassMethod,
  ClassProperty,
}

/**
 * @description
 *  1. 收集classBody里的变量/方法
 *  2. props塞入props中，ref/data变量塞入setup函数中， 方法塞入methods/computed/watch里
 * @param {ast} ast ast节点
 * @returns {ast} 转换后的ast节点
 */
 module.exports = function({ template }) {
  return {
    ExportDefaultDeclaration(path) {
      const declaration = path.get('declaration').node
      const decorators = declaration.decorators

      if (decorators) { // 类的装饰者(Component等等，不包含属性装饰和方法装饰， 以上由ClassProperty转译)转由Decorator执行
        decorators.forEach(d => {
          Decorator(d)
        })
      }

      if (declaration.type === 'ClassDeclaration') {
        const classBody = declaration.body.body
        if (Array.isArray(classBody)) {
          classBody.forEach(cBody => {
            const handler = handlerClassBodyMap[cBody.type]
            handler && handler(cBody)
          })
        }
      }
      
      path.node.declaration = DefineComponent(template)
    }
  }
}