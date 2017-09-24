const connect = require('connect')

const httpServer = require('ii-http-server')
const reloading = require('ii-reloading')

module.exports = () => {
  const app = httpServer()
  app.use('/_s', require('ii-stdlib'))
  app.use('/_ii', reloading(() => require('./uiCode')))
  app.use(require('./publicDir'))
}
