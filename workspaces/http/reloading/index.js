// app.js:        app.use('/foo', reloading(() => require('foo')))
// foo/index.js:  module.exports = (req, res, next) => { ... }

module.exports = (cb) => {
  const waitMS = 1000
  let lastRequest = undefined
  let handler = undefined

  return (req, res, next) => {
    if (!(lastRequest + waitMS > Date.now())) {
      Object.keys(require.cache).forEach(k => {
        delete require.cache[k]
      })

      try {
        handler = cb()
      } catch (err) {
        console.error(err)
        handler = (req, res, next) => {
          return next(err)
        }
      }
    }
    lastRequest = Date.now()
    return handler(req, res, next)
  }
}
