const posthtml = require('posthtml');
const templateSlot = require('./Vue3/TemplateSlot')
const templateVfor = require('./Vue3/TemplateVfor')
const RouterViewAbstract = require('./Vue3/RouterViewAbstract')
const Form = require('./AntdesignVue/Form');
const Primative = require('./Vue3/Primative');

module.exports = async function(content, output) {
  const res = await posthtml()
    .use(templateSlot())
    .use(templateVfor())
    .use(RouterViewAbstract())
    .use(Primative())
    .use(Form(output))
    .process(content, { recognizeSelfClosing: true })

  return res.html
}