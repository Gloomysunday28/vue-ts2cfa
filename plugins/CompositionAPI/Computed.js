const State = require('./State.js')
const Ref = require('./Ref.js')
const PropSync = require('./PropSync.js')

/**
 * @description
 *  收集Computed, 完整返回
 *  
 */
 module.exports = function Computed() {
  const { computed } = global.options

  const intactComputed = computed.filter(c => typeof c === 'string')
  const tidyComputed = computed.filter(c => typeof c === 'object').reduce((tidy, data) => {
    const code = `(${data.params})${data.returnType || ''} ${data.code}`
    if (tidy[data.name]) {
      tidy[data.name].code_two = {
        code,
        kind: data.kind
      }
    } else {
      tidy[data.name] = {
        code: {
          kind: data.kind,
          code
        },
      }
    }

    return tidy
  }, {})

  const computedRef = Ref()
  const computedState = State()
  const computedPropSync = PropSync()
  if (!computedPropSync && !computedState && !computedRef && !intactComputed.length && !Object.keys(tidyComputed).length) return ''

  return `
    computed: {
      ${Object.keys(tidyComputed).length ? Object.keys(tidyComputed).map(cpKey => {
        const codeMap = Object.values(tidyComputed[cpKey]) 
        const transformCode = codeMap.map(v => {
          return `${codeMap.length > 1 ? v.kind + ' ' : ''}${v.code}`
        })
        if (transformCode.length > 1) {
          return `${cpKey}: {${Object.values(transformCode).join(',')}}`
        } else {
          return `${cpKey}${Object.values(transformCode).join(',')}`
        }
      }).join(',') + ',' : ''}
      ${intactComputed.length ? intactComputed.join(',') + ',' : ''}
      ${computedRef}
      ${computedState}
      ${computedPropSync}
    },
  `
}