const transform = require('./transform') // 转换代码
const traverse = require('./traverse') // 递归循环遍历文件内容并且输出内容给到transform模块

function ChainTool() {
}

ChainTool.prototype = {
  contructor: ChainTool,
  transform() {
    transform.apply(this, arguments)

    return this
  },
  traverse
}

module.exports = ChainTool