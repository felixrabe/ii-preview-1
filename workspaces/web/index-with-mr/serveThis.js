const connect = require('connect')
const path = require('path')
const send = require('send')

const nodeModules = require('ii-1-web-node-modules')

const indexHtmlPath = path.join(__dirname, 'index.html')

module.exports = (() => {
  const route = connect()

  route.use(nodeModules(__dirname))
  route.use((req, res) => send(req, indexHtmlPath).pipe(res))

  return route
})()
