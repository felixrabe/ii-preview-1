const connect = require('connect')
const fs = require('fs')
const http = require('http')
const path = require('path')
const serveStatic = require('serve-static')

const config = require('ii-1-daemon-config')
const log = require('ii-1-daemon-log')
const httpReload = require('ii-1-net-http-reload')
const blankFavicon = require('ii-1-web-blank-favicon')

const r = (p) => httpReload(() => require.resolve(p))

module.exports = function createHttpServer() {
  const app = connect()

  app.use(blankFavicon)
  app.use('/_n', r('ii-1-web-serve-from-node-modules'))
  app.use('/_w', r('ii-1-web-http-handler'))
  app.use(r('ii-1-web-index'))

  const server = new http.Server(app)
  server.keepAliveTimeout = 1.5 * 1000
  server.timeout = 10 * 1000

  const _listen = server.listen.bind(server)
  server.listen = (cb) => {
    _listen(config.httpPort, config.httpHost, () => {
      log(`HTTP server listening on 'localhost:${config.httpPort}'`)
      cb && cb()
    })
  }

  const _close = server.close.bind(server)
  server.close = (cb) => {
    log('HTTP server shutting down')
    return _close(() => {
      return cb && cb()
    })
  }

  return server
}
