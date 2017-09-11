const connect = require('connect')
const path = require('path')
const send = require('send')
const serveStatic = require('serve-static')

const nodeModulesRootPath = path.resolve(__dirname, '../../../node_modules')
const rootStatic = serveStatic(nodeModulesRootPath, {index: false})
const indexHtmlPath = path.join(__dirname, 'index.html')

module.exports = (() => {
  const router = connect()

  router.use('/node_modules', rootStatic)
  router.use('/node_modules/mr/node_modules', rootStatic)
  router.use(serveStatic(__dirname, {index: false}))
  router.use((req, res) => send(req, indexHtmlPath).pipe(res))

  return router
})()
