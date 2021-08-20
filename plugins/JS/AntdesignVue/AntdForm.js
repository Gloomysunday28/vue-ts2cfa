/**
 * @description
 *  在data里生成对应rules变量
 * @returns { string } 转译后代码
 */
module.exports = function AntdForm() {
  const { rules } = global.options
  
  if (Object.keys(rules).length) {
    return `
      const _rules = ${JSON.stringify(rules)}
    `
  }

  return ''
}