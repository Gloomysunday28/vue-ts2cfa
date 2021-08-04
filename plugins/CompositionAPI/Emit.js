const generator = require('@babel/generator').default

/**
 * @description
 *  收集Mutation, 将其封装成methods使用
 */
 module.exports = function Emit(template) {
  const { emit } = global.options
  console.log('emit', emit.map(v => JSON.stringify(v.watchFn)))/* 2021年08月04日 16时39分29秒 */
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
        console.log('bodyAST', bodyAST)/* 2021年08月04日 17时02分10秒 */
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
        console.log('bodyCode', bodyCode)/* 2021年08月04日 17时01分46秒 */
        return `${name}(${params}) ${bodyCode}`
      }).join(',\n')
    }).join(',')},
  `
}