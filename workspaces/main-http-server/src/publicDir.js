const path = require('path')
const serveStatic = require('serve-static')

const publicPath = path.resolve(__dirname, '../public')

module.exports = serveStatic(publicPath)
