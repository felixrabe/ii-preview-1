const path = require('path')
const serveStatic = require('serve-static')

const uiPath = path.dirname(require.resolve('ii-ui/package.json'))

module.exports = serveStatic(uiPath)
