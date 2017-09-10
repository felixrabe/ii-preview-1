const send = require('send')

const sanitize = require('ii-1-url-sanitizer')

const urlToModulePath = (url) => {
  return require.resolve(sanitize(url))
}

module.exports = (req, res, next) => {
  send(req, urlToModulePath(req.url)).pipe(res)
}
