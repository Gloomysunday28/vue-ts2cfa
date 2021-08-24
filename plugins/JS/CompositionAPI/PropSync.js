/**
 * @description
 *  收集PropsSync
 */
 module.exports = function PropsSync() {
  const { prop } = global.options

  const syncProps = prop.filter(p => p.computedName)
  if (!syncProps.length) return ''

  return syncProps.map(pData => {
    return `${pData.computedName}: {
      get() {
        return this.${pData.name}
      },
      set(value) {
        this.$emit('update:${pData.name}', value)
      }
    }`
  }).join(',') + ','
}