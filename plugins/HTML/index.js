const posthtml = require('posthtml');
const templateSlot = require('./Vue3/TemplateSlot')
const templateVfor = require('./Vue3/TemplateVfor')
const Form = require('./AntdesignVue/Form')

module.exports = async function(content) {
  const res = await posthtml()
    .use(templateSlot())
    .use(templateVfor())
    .use(Form())
    .process(content, { recognizeSelfClosing: true })

  return res.html
}