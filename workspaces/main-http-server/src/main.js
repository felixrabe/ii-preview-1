const httpServer = require('ii-http-server')
const reloading = require('ii-reloading')

module.exports = () => {
  const app = httpServer()
  app.use('/_s', require('ii-stdlib'))
  app.use('/_ii', reloading(() => require('ii-ui')))
  app.use(require('./publicDir'))
}
