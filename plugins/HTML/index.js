const posthtml = require('posthtml');
const templateSlot = require('./Vue3/TemplateSlot')
const templateVfor = require('./Vue3/TemplateVfor')
const RouterViewAbstract = require('./Vue3/RouterViewAbstract')
const Form = require('./AntdesignVue/Form')

module.exports = async function(content) {
  const res = await posthtml()
    .use(templateSlot())
    .use(templateVfor())
    .use(RouterViewAbstract())
    .use(Form())
    .process(content, { recognizeSelfClosing: true })

  return res.html
}