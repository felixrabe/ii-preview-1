const parseurl = require('parseurl')
const fs = require('fs')
const path = require('path')
const serveStatic = require('serve-static')
const util = require('util')

const transpiler = require('ii-transpiler')

const uiPath = path.dirname(require.resolve('ii-ui/package.json'))

const readFile = util.promisify(fs.readFile)

const sanitize = (pathname) =>
  pathname.split('/').map(x => '/' + x).join('/').replace(/\/+/g, '/')
  // returned value starts with '/'

module.exports = async (req, res, next) => {
  try {
    const pathname = sanitize(parseurl(req).pathname)
    const filePath = path.join(uiPath, '.' + pathname)
    const fileCode = await readFile(filePath, 'utf-8')
    const transpiledCode = transpiler(fileCode)
    res.setHeader('Content-Type', 'text/javascript; charset="utf-8"')
    res.end(transpiledCode)
  } catch (err) {
    res.statusCode = 500
    res.setHeader('Content-Type', 'text/plain; charset="utf-8"')
    res.end(err.stack)
  }
}

// module.exports = serveStatic(uiPath)

// module.exports = (req, res, next) => {
//   res.setHeader('Content-Type', 'text/javascript; charset="utf-8"')
//   res.end("document.getElementById('root').textContent = 'transpiled code greets you'")
// }
