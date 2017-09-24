const connect = require('connect')

const httpServer = require('ii-http-server')
const reloading = require('ii-reloading')

module.exports = () => {
  const app = httpServer()

  app.use('/_ui_n', reloading(() => require('./uiModules')))
  app.use('/_ui', reloading(() => require('./ui')))
  app.use(require('./public'))
}
