const t = require('@babel/types')

/**
 *  @description
 *  更改ant-design-vue column customeRender的参数
 */
module.exports = function ObjectMethod(path) {
  const objectMethodBody = path.node
  const key = objectMethodBody.key.name
  const params = objectMethodBody.params
  if (key === 'customRender') {
    const hasTsType = params.some(param => param.typeAnnotation)
    if (params.length && params[0].type === 'Identifier') {
      const objectPattern = t.objectPattern(params.map((param, index) => {
        const name = param.name // 参数变量
        const key = index ? (index === 1 ? 'record' : 'index') : 'text'
        return t.objectProperty(t.stringLiteral(key), t.identifier(key === name ? key : name))
      }))  
      
      if (hasTsType) {
        objectPattern.typeAnnotation = t.tsTypeAnnotation(
          t.tsTypeLiteral(
            params.map((param, index) => {
              const key = index ? (index === 1 ? 'record' : 'index') : 'text'
              return t.tsPropertySignature(
                t.identifier(key),
                param.typeAnnotation || t.TSTypeAnnotation(t.TSAnyKeyword())
              )
            })
          )
        )
      }

      objectMethodBody.params = [
        objectPattern
      ]
    }
  }
}