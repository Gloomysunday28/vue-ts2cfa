module.exports = function getTemplate(template, { attrs, transformCode }, styles) {
  return `<template>
  ${template}
</template>

<script ${Object.entries(attrs).map(([key, value]) => `${key}="${value}"`).join(' ')}>
  ${transformCode}
</script>
  
${styles.map(style => {
  const attrs = Object.entries(style.attrs).map(([key, value]) => `${key}="${value}"`).join(' ')
  return `<style ${attrs}>${style.content}</style>`
}).join('\n')}
`
}