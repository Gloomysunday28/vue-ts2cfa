const AntdForm = require('../AntdesignVue/AntdForm')

/**
 * @description
 *  收集Data, 更新Data的用法
 */
 module.exports = function Data(template) {
  const { data } = global.options
  let formVariable = AntdForm(template)

  if (Array.isArray(data)) {
    return data.length ? `
      data() {
        ${data.map(v => `let ${v.code}`).join('\n')}

        ${formVariable}
        return {
          ${data.map(v => `${v.name}: ${v.identifier}`).join(',\n')},
          ${formVariable ? `rules: _rules` : ''}
        }
      },
    ` : (formVariable ? `
    data() {
      ${formVariable}

      return {
        rules: _rules
      }
    },
  ` : '')
  } else {
    return data ? data + ',' : (formVariable ? `
      data() {
        ${formVariable}

        return {
          rules: _rules
        }
      },
    ` : '')
  }
}