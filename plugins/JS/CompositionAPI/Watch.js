function generatorWatch(watchFn) {
  return (watchFn.length === 1 
    ? generatorOptionsWatch(watchFn[0])
    :
    `[${watchFn.map(watch => {
      return generatorOptionsWatch(watch)
    })}]`)
}

function generatorOptionsWatch(watch) {
  const handler = generatorHandler(watch)

  if (watch.options) {
    return `{
      handler: ${handler},
      ${watch.options}
    }`
  }

  return handler
}

function generatorHandler(watch) {
  const conformMethods = watch.conformMethods
  const conformObject = watch.conformObject
  const fromCompoent = watch .fromCompoent
  if (!fromCompoent) {
    return JSON.stringify(watch.name)
  }
  return conformMethods ? `${watch.async ? 'async ' : ''}function ${watch.name || ''}(${watch.params ||''}) ${watch.body}` : `${conformObject ? watch.body : JSON.stringify(watch.body)}`
}

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
       
        return `${pData.key}: ${generatorWatch(watchFn)}`
      })}
    },
  `
}