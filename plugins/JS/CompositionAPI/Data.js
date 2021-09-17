const AntdForm = require('../AntdesignVue/AntdForm')

/**
 * @description
 *  收集Data, 更新Data的用法
 */
 module.exports = function Data(template) {
  const { data, provide } = global.options
  let formVariable = AntdForm(template)

  const provideCode = provide.map(p => {
    const { name, typeAnnotation, value } = p
    return `let ${name}${typeAnnotation} = ${value}`
  }).join('\n')

  const reutnrProvdeCode = provide.map(p => {
    const { name } = p

    return `${name}`
  }).join(',\n')

  if (Array.isArray(data)) {
    return data.length ? `
      data() {
        ${data.map(v => `let ${v.code}`).join('\n')}
        ${provideCode}

        ${formVariable}
        return {
          ${data.map(v => `${v.name}: ${v.identifier}`).join(',\n')},
          ${formVariable ? `rules: _rules,` : ''}
          ${reutnrProvdeCode}
        }
      },
    ` : (formVariable || provideCode ? `
    data() {
      ${formVariable}
      ${provideCode}

      return {
        ${formVariable ? 'rules: _rules,' : ''}
        ${reutnrProvdeCode}
      }
    },
  ` : '')
  } else {
    return data ? data + ',' : (formVariable || provideCode ? `
      data() {
        ${formVariable}
        ${provideCode}

        return {
          ${formVariable ? 'rules: _rules,' : ''}
          ${reutnrProvdeCode}
        }
      },
    ` : '')
  }
}