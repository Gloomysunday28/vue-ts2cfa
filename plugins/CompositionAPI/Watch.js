/**
 * @description
 *  收集Watch, 更新Watch的用法
 */
 module.exports = function Watch() {
  const { watch } = global.options
  if (!watch.length) return ''

  return `
    watch: {
      ${watch.map(pData => {
        const watchFn = pData.watchFn
        return `${pData.key}: ${
          watchFn.length === 1 
            ? (watchFn[0].conformMethods ? `function ${watchFn[0].name || ''}(${watchFn[0].params || ''})${watchFn[0].body}` : `${JSON.stringify(watchFn[0].body)}`)
            :
            `[${watchFn.map(watch => {
              const conformMethods = watch.conformMethods
              return conformMethods ? `function ${watch.name || ''}(${watch.params ||''}) ${watch.body}` : `${JSON.stringify(watch.body)}`
            })}]`
        }`
      })}
    },
  `
}