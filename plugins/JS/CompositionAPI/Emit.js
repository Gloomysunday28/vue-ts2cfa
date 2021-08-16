const generator = require('@babel/generator').default

/**
 * @description
 *  收集Mutation, 将其封装成methods使用
 */
 module.exports = function Emit(template) {
  const { emit } = global.options
  if (!emit.length) return ''

  return `
    ${emit.map(emitData => {
      const key = emitData.key
      const watchFn = emitData.watchFn
      return watchFn.map(emitFn => {
        const { name, params, body, paramsAst, bodyAST } = emitFn
        const paramsName = (paramsAst || []).map(param => param.name).join(',')
        const index = bodyAST.body.findIndex(v => v.type === 'ReturnStatement')
        var bodyCode = ''
        if (~index) {
          const returnStatement = bodyAST.body[index]
          const returnCode = generator(returnStatement.argument).code
          
          bodyAST.body[index] = template.ast(`
            this.$emit(${key || JSON.stringify(name)}, ${returnCode}, ${paramsName})
          `)
        } else {
          bodyAST.body.push(template.ast(`
            this.$emit(${key || JSON.stringify(name)}, ${paramsName})
          `))
        }
        
        bodyCode = generator(bodyAST).code
        return `${name}(${params}) ${bodyCode}`
      }).join(',\n')
    }).join(',')},
  `
}