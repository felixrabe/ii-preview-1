const path = require('path')
const send = require('send')

const indexHtmlPath = path.join(__dirname, 'index.html')

module.exports = (req, res) => send(req, indexHtmlPath).pipe(res)
