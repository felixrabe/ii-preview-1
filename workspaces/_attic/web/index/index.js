const fs = require('fs')
const path = require('path')
const send = require('send')

const sanitize = require('ii-1-web-url-sanitizer')

const htmlPath = path.join(__dirname, 'index.html')

module.exports = function webIndexHtmlHandler(req, res) {
  let p = path.join(__dirname, sanitize(req.url))
  if (!(fs.existsSync(p) && fs.statSync(p).isFile())) {
    p = htmlPath
  }
  send(req, p).pipe(res)
}
