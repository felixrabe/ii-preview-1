const fs = require('fs')
const path = require('path')
const send = require('send')

const sanitize = require('ii-1-url-sanitizer')

const htmlPath = path.join(__dirname, 'index.html')

module.exports = function webIndexHtmlHandler(req, res) {
  let p = path.join(__dirname, sanitize(req.url))
  if (!(fs.existsSync(p) && fs.statSync(p).isFile())) {
    p = htmlPath
  }
  // res.end(JSON.stringify(p))
  send(req, p).pipe(res)
}
