module.exports = {
  clearGlobalState() {
    global.isDone = false // ImportDeclartion需要开关
    global.ImportCompositionApiAST = null // 清除compositionAPI的引用
    this.initOptions()
  },
  /**
   * @description
   *  初始化options
   *  options里会装载data/prop/method/computed/watch五种类型
   */
  initOptions() {
    global.options = {
      setup: [],
      data: null, // 原封不动的返回
      prop: [],
      methods: [],
      computed: [],
      watch: []
    }
  },
  isObject(type) {
    return type === 'ArrayExpression' || type === 'ObjectExpression'
  },
  hasImportNamed(name) {
    return global.ImportCompositionApiAST.specifiers.some(specifier => {
      return specifier.imported.name === name
    })
  }
}