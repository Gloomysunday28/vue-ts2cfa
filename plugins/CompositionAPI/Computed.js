const Ref = require('./Ref.js')

/**
 * @description
 *  收集Computed, 完整返回
 *  
 */
 module.exports = function Computed() {
  const { computed } = global.options

  const intactComputed = computed.filter(c => typeof c === 'string')
  const tidyComputed = computed.filter(c => typeof c === 'object').reduce((tidy, data) => {
    const code = `${data.kind + 'ter'}(${data.params})${data.returnType || ''} ${data.code}`
    if (tidy[data.name]) {
      tidy[data.name].code_two = code
    } else {
      tidy[data.name] = {
        code
      }
    }

    return tidy
  }, {})

  if (!intactComputed.length && !tidyComputed.length) return ''

  return `
    computed: {
      ${Object.keys(tidyComputed).map(cpKey => {
        const transformCode = tidyComputed[cpKey]
        return `${cpKey}: {${Object.values(transformCode).join(',')}}`
      }).join(',')},
      ${intactComputed.join(',')},
      ${Ref()}
    },
  `
}