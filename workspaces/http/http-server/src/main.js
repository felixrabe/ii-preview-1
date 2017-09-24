const http = require('http')

const onShutdown = require('ii-on-shutdown')

const createApp = require('./createApp')

const defaultOpts = {
  keepAliveTimeout: 1.5 * 1000,
  timeout: 10 * 1000,
  host: 'localhost',
  port: 8080,
}

module.exports = (opts = {}) => {
  opts = Object.assign({}, defaultOpts, opts)

  const app = createApp()

  const server = new http.Server(app)
  server.keepAliveTimeout = opts.keepAliveTimeout
  server.timeout = opts.timeout

  const shutdown = async () => {
    await new Promise(r => server.close(r))
    console.log('Shut down.')
  }

  server.listen(opts.port, opts.host, () => {
    const addr = server.address()
    console.log(`Serving ${addr.address}:${addr.port}.`)
  })

  onShutdown(shutdown)

  return app
}
