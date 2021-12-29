/**
 * @description
 *  收集Mutation, 将其封装成methods使用
 */
 module.exports = function Mutation(mutation = global.options.mutation) {
  if (!mutation.length) return ''

  return `
    ${mutation.map(mutationData => {
      return `${mutationData.name}(...rest) {
        return this.$store.commit.apply(this.$store, [${mutationData.arguments}].concat(rest))
      }`
    })},
  `
}