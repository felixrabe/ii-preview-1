const connect = require('connect')
const http = require('http')
const morgan = require('morgan')
const path = require('path')
const send = require('send')
const serveStatic = require('serve-static')

const blankFavicon = require('ii-blank-favicon')
const serveUI = require('ii-serve-ui')

const publicPath = path.resolve(__dirname, '..', 'public')
const servePublic = serveStatic(publicPath)

module.exports = () => {
  const app = connect()
  app.use(blankFavicon)
  app.use(morgan('tiny'))
  app.use('/_ui', serveUI)
  app.use(servePublic)

  const server = new http.Server(app)

  server.listen(8080, 'localhost', () => {
    const a = server.address()
    console.log(`Server ready at ${a.address}:${a.port}`)
  })
}
