const favicon = require('serve-favicon')
const path = require('path')

module.exports = favicon(path.join(__dirname, 'favicon.ico'))
