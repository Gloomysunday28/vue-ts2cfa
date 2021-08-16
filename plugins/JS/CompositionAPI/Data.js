/**
 * @description
 *  收集Data, 更新Data的用法
 */
 module.exports = function Data() {
  const { data } = global.options
  
  if (Array.isArray(data)) {
    return data.length ? `
      data() {
        ${data.map(v => `let ${v.code}`).join('\n')}

        return {
          ${data.map(v => `${v.name}: ${v.identifier}`).join(',\n')}
        }
      },
    ` : ''
  } else {
    return data ? data + ',' : ''
  }
}