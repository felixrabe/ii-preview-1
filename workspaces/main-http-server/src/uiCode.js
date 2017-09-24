const babel = require('babel-core')
const fs = require('fs')
const parseUrl = require('parseurl')
const path = require('path')
const querystring = require('querystring')
const util = require('util')

const importRewriter = [require('ii-module-rewriter'), {
  replaceFunc(originalPath, callingFileName, options) {
    if (originalPath.indexOf('/') !== -1) return originalPath
    return `/_ii/${originalPath}`
  }
}]

const babelOpts = {
  plugins: [
    'transform-react-jsx',
    importRewriter,
  ],
}

const babelTransformFile = util.promisify(babel.transformFile)
const jstr = o => JSON.stringify(o, null, 2)
const uiMod = require('../ui/_thisMod')

const tryResolve = (modName, parentMod) => {

}

module.exports = async (req, res, next) => {
  const parsed = parseUrl(req)
  const modName = parsed.pathname.slice(1)

  tryResolve(modName, uiMod)

  // const filePath = path.resolve(__dirname, '..', 'ui', 'index.mjs')

  try {
    const {code} = await babelTransformFile(filePath, babelOpts)

    res.writeHead(200, {'Content-Type': 'application/javascript'})
    // return res.end(jstr({modName, filePath}))
    return res.end(code)
  } catch (err) {
    res.writeHead(500, {'Content-Type': 'text/plain; charset=utf-8'})
    return res.end(jstr({error: {name: err.name, message: err.message}}))
  }
}
