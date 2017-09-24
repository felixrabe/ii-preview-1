const babel = require('babel-core')
const fs = require('fs')
const path = require('path')
const util = require('util')

const babelTransformFile = util.promisify(babel.transformFile)

const sanitizePathname = (pathname) =>  // returned value starts with '/'
  pathname.split('/').map(x => '/' + x).join('/').replace(/\/+/g, '/')

module.exports = ({rootPath, ...babelOpts}) => async (req, res, next) => {
  const filePath = path.join(rootPath, '.' + sanitizePathname(req.url))
  if (!fs.existsSync(filePath)) {
    return next()
  }

  const {code} = await babelTransformFile(filePath, babelOpts)

  res.writeHead(200, {'Content-Type': 'application/javascript'})
  res.end(code)
}
