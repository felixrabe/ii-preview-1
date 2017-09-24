const parseUrl = require('parseurl')

const moduleLocator = require('ii-module-locator')

const uiMod = require('../ui/_thisMod')
const babel = require('./babel')

const jstr = o => JSON.stringify(o, null, 2)
const loc = moduleLocator(uiMod)

const getRoute = (req) => {
  let orig = parseUrl.original(req).pathname
  if (orig.endsWith('/')) orig = orig.slice(0, -1)
  const url = parseUrl(req).pathname
  if (url === '/') return orig
  return orig.slice(0, -url.length)
}

module.exports = async (req, res, next) => {
  try {
    const {filePath, modName, modType, redirect} = loc(req)

    if (redirect) {
      res.writeHead(302, {Location: getRoute(req) + redirect})
      return res.end()
    }

    if (!filePath) {
      return next()
    }

    const code = await babel(filePath)
    res.writeHead(200, {'Content-Type': 'application/javascript'})
    return res.end(code)
  } catch (err) {
    return next(err)
  }
}

// module.exports = async (req, res, next) => {
//   let filePath, modName, modType, redirect
//   try {
//     ({filePath, modName, modType, redirect} = loc(req))
//   } catch (err) {
//     return next(err)
//   }

//   if (redirect) {
//     res.writeHead(302, {Location: getRoute(req) + redirect})
//     return res.end()
//   }

//   let code
//   try {
//     code = await babel(filePath)
//   } catch (err) {
//     return next(err)
//   }
//   res.writeHead(200, {'Content-Type': 'application/javascript'})
//   return res.end(code)
// }
