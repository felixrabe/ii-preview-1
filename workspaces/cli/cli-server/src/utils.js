module.exports = {
  cloneAssign: (o, ...aa) =>
    Object.assign(Object.create(Object.getPrototypeOf(o)), o, ...aa),

  createPlainObject: (...aa) => {
    return Object.assign(Object.create(null), ...aa)
  },

  flushRequireCache: () => Object.keys(require.cache).forEach(k => {
    delete require.cache[k]
  }),
}
