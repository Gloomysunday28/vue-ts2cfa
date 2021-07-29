const { declare } = require('@babel/helper-plugin-utils')

module.exports = declare(function() {
  return {
    manipulateOptions() {},
    pre(){},
    visitor:{},
    post(){}
  }
})