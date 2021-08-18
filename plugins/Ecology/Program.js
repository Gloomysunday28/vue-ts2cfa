/**
 * @description
 *  1. 添加router.isReady
 *  2. 挂载对应的app
 * @param {ast} ast ast节点
 * @returns {ast} 转换后的ast节点
 */
 module.exports = function() {
  return {
    Program(path) {
      global.rootPath = path
    }
  }
}