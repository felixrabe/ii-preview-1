const serveStatic = require('serve-static')

module.exports = serveStatic(__dirname, {index: false})
