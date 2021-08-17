module.exports = function AntdForm() {
  const { rules } = global.options
  
  if (Object.keys(rules).length) {
    return `
      const _rules = ${JSON.stringify(rules)}
    `
  }

  return ''
}