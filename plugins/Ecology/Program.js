/**
 * @description
 *  1. 添加router.isReady
 *  2. 挂载对应的app
 * @param {ast} ast ast节点
 * @returns {ast} 转换后的ast节点
 */
 module.exports = function({ t }, filename = '') {
  return {
    Program(path) {
      global.rootPath = path

      if (filename.includes('register')) {
        const body = path.node.body
        const index = body.findIndex(ast => {
          return ast.type !== 'ImportDeclaration'
        })

        if (~index) {
          const ProgramBody = body.slice(index)
          body[index] = t.exportDefaultDeclaration(
            t.functionDeclaration(
              t.identifier('Register'),
              [t.identifier('Vue')],
              t.blockStatement(ProgramBody)
            )
          )
          body.length = index + 1
        }
      }
    }
  }
}