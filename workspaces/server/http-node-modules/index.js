const connect = require('connect')
const path = require('path')
const serveStatic = require('serve-static')

const nodeModulesRootPath = path.resolve(__dirname, '../../../node_modules')
const rootStatic = serveStatic(nodeModulesRootPath, {index: false})

module.exports = (modulePath) => {
  const router = connect()

  router.use('/node_modules', rootStatic)
  router.use(serveStatic(modulePath, {index: false}))

  return router
}
