const connect = require('connect')
const http = require('http')
const morgan = require('morgan')

const blankFavicon = require('ii-1-server-blank-favicon')
const httpReload = require('ii-1-server-http-reload')

const config = {
  host: 'localhost',
  port: 11080,
}

module.exports = function createHttpServer() {
  const app = connect()

  app.use(blankFavicon)
  app.use(morgan('tiny'))
  app.use('/_', httpReload('ii-1-ui-main/serveThis'))
  app.use(httpReload('ii-1-web-index-with-mr/serveThis'))

  const server = new http.Server(app)
  server.keepAliveTimeout = 1.5 * 1000
  server.timeout = 10 * 1000

  const prevListen = server.listen.bind(server)
  server.listen = function listen(cb) {
    return prevListen(config.port, config.host, () => {
      console.log(`HTTP server listening on '${config.host}:${config.port}'`)
      return cb && cb()
    })
  }

  const prevClose = server.close.bind(server)
  server.close = (cb) => {
    return prevClose(() => {
      console.log('HTTP server stopped')
      return cb && cb()
    })
  }

  return server
}
