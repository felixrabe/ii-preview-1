const foundMPathCache = Object.create(null)

const findModuleWithPrefix = (prefix, mPath) => {
  let pp = `${prefix}${mPath}`
  let foundMPath = []

  pp.split('/').find(p => {
    foundMPath.push(p)
    p = foundMPath.join('/')
    try {
      foundMPath = require.resolve(p)
    } catch (err) {
      return false
    }
    pp = pp.slice(p.length)
    return true
  })

  if (Array.isArray(foundMPath)) return undefined

  return {foundMPath, pp}
}

const findModule = (mPath) => {
  if (!(mPath in foundMPathCache)) {
    foundMPathCache[mPath] = findModuleWithPrefix('ii-1-web-', mPath)
  }

  return foundMPathCache[mPath]
}

const moduleCache = Object.create(null)

const loadModule = (mPath) => {
  const found = findModule(mPath)
  if (!found) return (_, res) => {
    res.writeHead(404)
    res.end(`Not found: ${mPath}`)
  }

  const {foundMPath, pp} = found

  if (!(foundMPath in moduleCache)) {
    delete require.cache[foundMPath]
    const mod = require(foundMPath)
    moduleCache[foundMPath] = mod
  }

  return (req, res, next) => {
    req = Object.assign(
      Object.create(Object.getPrototypeOf(req)),
      {...req, url: pp},
    )
    moduleCache[foundMPath](req, res, next)
  }
}

module.exports = (req, res, next) => {
  loadModule(req.url.slice(1))(req, res, next)
}
