const { componsitionAPIHooks } = require('./hooks')

const hooksMapping = new Map([
  ['beforeDestroy', 'beforeUnmount'],
  ['destroyed', 'unmounted'],
])

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
      data: [],
      name: null, // 原封不懂的返回
      filters: null, // 原封不动的返回
      directives: null, // 原封不动的返回
      components: null, // 原封不动的返回
      prop: [],
      methods: [],
      computed: [],
      watch: [],
      ref: [],
      hooks: [],
      state: [],
      mixins: [], // 原封不动的返回
      mutation: [],
      action: [],
      getter: [],
      model: [],
      emit: [],
      provide: [],
      inject: [],
      icons: [], // a-icon的收集
      render: null, // render函数
      rules: {}, // antdesignvue form rules
      formRef: '', // 假设每个页面只有一个form组件, formRef指向form组件的ref属性
    }
  },
  isObject(type) {
    return type === 'ArrayExpression' || type === 'ObjectExpression'
  },
  hasImportNamed(name) {
    return global.ImportCompositionApiAST.specifiers.some(specifier => {
      return specifier.imported.name === name
    })
  },
  /**
   * @description
   *  export const onBeforeMount = createLifeCycle('beforeMount')
   *  export const onMounted = createLifeCycle('mounted')
   *  export const onBeforeUpdate = createLifeCycle('beforeUpdate')
   *  export const onUpdated = createLifeCycle('updated')
   *  export const onBeforeUnmount = createLifeCycle('beforeDestroy')
   *  export const onUnmounted = createLifeCycle('destroyed')
   *  export const onErrorCaptured = createLifeCycle('errorCaptured')
   *  export const onActivated = createLifeCycle('activated')
   *  export const onDeactivated = createLifeCycle('deactivated')
   *  export const onServerPrefetch = createLifeCycle('serverPrefetch')
   * @param {string} name 
   * @returns 
   */
  transformHooksName(name) {
    const newLifeCycleName = hooksMapping.get(name)
    return newLifeCycleName || name
  },
  /**
   * @description
   *  将其click 转换成 onClick形式
   * @param {string} str
  */
  transformEventName(str) {
    str = hooksMapping.get(str) || str
    return str.replace(/([a-zA-Z])(\w*)/, (c, first, rest) => {
      return 'on' + first.toUpperCase() + rest
    })
  }
}