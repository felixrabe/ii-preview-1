const connect = require('connect')
const http = require('http')

const blankFavicon = require('ii-1-server-blank-favicon')
const httpReload = require('ii-1-server-http-reload')

module.exports = function createHttpServer() {
  const app = connect()

  app.use(blankFavicon)
  app.use(httpReload('ii-1-web-index'))

  const server = new http.Server(app)
  server.keepAliveTimeout = 1.5 * 1000
  server.timeout = 10 * 1000

  const prevListen = server.listen.bind(server)
  server.listen = function listen() {
    return prevListen(11080, 'localhost')
  }

  return server
}
