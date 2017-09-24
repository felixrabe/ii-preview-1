const moduleLocator = require('ii-module-locator')

const uiMod = require('../ui/_thisMod')
const babel = require('./babel')

const loc = moduleLocator(uiMod)

module.exports = async (req, res, next) => {













  const resolved = resolveToFileOrRedirect(req)

  if (resolved.indexOf('/') === -1) {
    // res.writeHead(302, {Location: 'foo/bar/baz'})
    return res.end()
  }

  return res.end(jstr({
    resolved,
  }))

  try {
    const code = await babel(filePath)

    res.writeHead(200, {'Content-Type': 'application/javascript'})
    return res.end(code)
  } catch (err) {
    res.writeHead(500, {'Content-Type': 'text/plain; charset=utf-8'})
    return res.end(jstr({error: {name: err.name, message: err.message}}))
  }
}
