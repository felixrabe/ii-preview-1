const connect = require('connect')
const path = require('path')
const serveStatic = require('serve-static')

const nodeModulesRootPath = path.resolve(__dirname, '../../../node_modules')
const rootStatic = serveStatic(nodeModulesRootPath, {index: false})

module.exports = (modulePath) => {
  const route = connect()

  route.use('/node_modules', rootStatic)
  route.use(serveStatic(modulePath, {index: false}))

  return route
}
