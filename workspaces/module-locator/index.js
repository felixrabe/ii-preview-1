const fs = require('fs')
const parseUrl = require('parseurl')
const path = require('path')
const querystring = require('querystring')

module.exports = (parentMod) => {
  const parentModDir = path.dirname(parentMod.filename)

  const searchDirs = [...Array(4)].reduce((searchDirs, _, i) => {
    const p = path.resolve(parentModDir, ...[...Array(i)].map(() => '..'))
    const nm = path.join(p, 'node_modules')
    return searchDirs.concat(fs.existsSync(nm) ? nm : [])
  }, [])

  const locate = (what) => {
    for (let i = 0; i < searchDirs.length; i++) {
      const d = searchDirs[i]
      const p = path.join(d, what)
      if (fs.existsSync(p)) return p
    }
  }

  const buildRedirect = (p, n, t) => ({
    redirect: `/${p}?${querystring.stringify({n, t})}`
  })

  const resolveModule = (modName) => {
    const pkgJsonPath = locate(path.join(modName, 'package.json'))
    if (!pkgJsonPath) return {filePath: undefined}

    const pkgJsonDir = path.dirname(pkgJsonPath)
    let pkgJson = {}
    try {
      pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf-8'))
    } catch (err) {
    }

    let modType = 'es'
    let modPath = pkgJson.module || pkgJson['jsnext:main']

    if (!modPath) {
      const r = path.join('umd', `${modName}.development.js`)
      const p = path.join(pkgJsonDir, r)
      if (fs.existsSync(p)) {
        modType = 'amd'
        modPath = r
      }
    }

    if (!modPath) {
      modType = 'cjs'
      modPath = pkgJson.main
    }

    if (!modPath) {
      modType = 'cjs'
      modPath = 'index.js'
    }

    return buildRedirect(path.join(modName, modPath), modName, modType)
  }

  const locateFile = (modPath) => {
    return locate(modPath)
  }

  return (req) => {
    const parsed = parseUrl(req)
    const query = querystring.parse(parsed.query)
    const modName = query.n
    const modType = query.t

    let modPath = parsed.pathname.slice(1)

    if (!modType) {
      if (modPath === '') modPath = 'index.mjs'
      if (fs.existsSync(path.join(parentModDir, modPath)))
        return buildRedirect(modPath, '', 'es')
      return resolveModule(modPath)
    } else {
      let filePath = path.join(parentModDir, modPath)
      if (fs.existsSync(filePath)) return {filePath, modName, modType}
      return {filePath: locateFile(modPath), modName, modType}
    }
  }
}
