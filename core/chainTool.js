const transformOriginCode = require('./transformOriginCode') // 转换代码
const transformMainEntryCode = require('./transformMainEntryCode') // 转换代码
const traverse = require('./traverse') // 递归循环遍历文件内容并且输出内容给到transform模块
const utils = require('../utils')

function ChainTool() {
  this.clearGlobalState()
}

ChainTool.prototype = {
  contructor: ChainTool,
  clearGlobalState() {
    utils.clearGlobalState()
  },
  transformOriginCode() {
    transformOriginCode.apply(this, arguments)

    return this
  },
  traverse() {
    traverse.apply(this, arguments)

    return this
  },
  transformMainEntryCode() {
    transformMainEntryCode.apply(this, arguments)

    return this
  }
}

module.exports = new ChainTool()