const fs = require('fs')
const path = require('path')
const { transformAsync } = require('@babel/core')
const transformPlugin = require('../plugins')

/**
 * @description
 *   用于转换源码中对应规则的代码
 * @param {string} code 源码字符
 * @returns {string} 返回转换后的代码
 */
module.exports = function transformOriginCode(code) {
  const { code: transformCode } = transformAsync(code, {
    plugins: [transformPlugin],
  })

  return transformCode
}