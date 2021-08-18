/**
 * @description
 *  添加composition-api包导入
 * @param {ast} ast ast节点
 * @returns {ast} 转换后的ast节点
 */
 module.exports = function({ t }, filename) {
  return {
    ExpressionStatement(path) {
      const ast = path.node.expression
      const callee = ast.callee
      if (!global.isDone) {
        global.isDone =  true
        path.insertBefore(t.variableDeclaration('var', [t.variableDeclarator(t.identifier('app'), t.identifier('undefined'))])) // var app = undefined
      }
      if (callee) {
        const property = callee.property
        if (property && property.name === '$mount') {
          const mountElAst = ast.arguments[0] // 获取$mount函数里的值

          path.node.expression = t.assignmentExpression('=', t.identifier('app') ,t.callExpression( // createApp().use(router).use(store)
            t.memberExpression(
              t.callExpression(
                t.memberExpression(
                  t.callExpression(t.identifier('createApp'), [t.identifier('App')]),
                  t.identifier('use')
                ),
                [t.identifier('router')]
              ),
              t.identifier('use')
            ), [t.identifier('store')]
          ))

          if (filename.startsWith('main')) {
            global.rootPath.node.body.push( // router.isReady().then(() => { app.mount('#app') })
              t.expressionStatement(
                t.callExpression(
                  t.memberExpression(
                    t.callExpression(
                      t.memberExpression(
                        t.identifier('router'),
                        t.identifier('isReady')
                      ),
                      []
                    ),
                    t.identifier('then')
                  ),
                  [t.arrowFunctionExpression(
                    [t.identifier('()')],
                    t.blockStatement(
                      [t.expressionStatement(
                        t.callExpression(
                          t.memberExpression(
                            t.identifier('app'),
                            t.identifier('mount')
                          ),
                          [mountElAst]
                        )
                      )]
                    )
                  )]
                )
              )
            )
          }
        } 
      } else path.skip()
    }
  }
}