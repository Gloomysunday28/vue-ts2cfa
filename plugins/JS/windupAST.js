module.exports = function() {
  const { methods, hooks, computed, watch } = global.options
  const setup = global.options.setup.slice(0)
  global.options.setup = []

  setup.forEach((data) => {
    const identifier = `this.${data.name}`
    if (methods.some(method => {
      return method.code.includes(identifier)
    }) || hooks.some(hook => {
      return hook.body.includes(identifier)
    }) || computed.some(compute => {
      return compute.code.includes(identifier)
    }) || watch.some(wt => {
      return wt.watchFn.some(fn => fn.body.includes(identifier))
    })) {
      global.options.data.push(data)
    } else {
      global.options.setup.push(data)
    }
  })
}