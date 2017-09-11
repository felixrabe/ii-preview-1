const path = require('path')
const serveStatic = require('serve-static')

module.exports = (p) => {
  return serveStatic(p)
}
