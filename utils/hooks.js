module.exports = {
  lifeCycleHooks: [
    'beforeCreate',
    'created',
    'beforeMount',
    'mounted',
    'beforeUpdate',
    'updated',
    'activated',
    'deactivated',
    'beforeDestroy',
    'destroyed',
    'errorCaptured',
    'beforeRouteEnter',
    'beforeRouteLeave',
    'beforeRouteUpdate' // 路由更新时触发
  ],
  componsitionAPIHooks: [ // compositionAPI拥有的hooks函数
    'beforeMount',
    'mounted',
    'beforeUpdate',
    'updated',
    'activated',
    'deactivated',
    'beforeDestroy',
    'destroyed',
    'errorCaptured',
  ]
}