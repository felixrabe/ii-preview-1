const fs = require('fs')
const parseUrl = require('parseurl')
const path = require('path')
const querystring = require('querystring')

module.exports = (parentMod) => {
  const parentModDir = path.dirname(parentMod.filename)

  const searchDirs = [...Array(3)].reduce((searchDirs, _, i) => {
    const p = path.resolve(parentModDir, ...[...Array(i)].map(() => '..'))
    // const s = glob.sync('node_modules', {cwd: p})
    // return searchDirs.concat(s.map(d => path.resolve(p, d)))
    const nm = path.join(p, 'node_modules')
    return searchDirs.concat(fs.existsSync(nm) ? nm : [])
  }, [])

  const resolveModule = (modName) => {
    const pkgJsonPath = (() => {
      for (let i = 0; i < searchDirs.length; i++) {
        const d = searchDirs[i]
        let p = path.join(d, modName, 'package.json')
        if (fs.existsSync(p)) return p
      }
      return undefined
    })()
    if (!pkgJsonPath) return undefined

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

    const p = path.join(modName, modPath)
    const query = querystring.stringify({
      n: modName,
      t: modType,
    })

    const redirect = `/${p}?${query}`

    return {redirect}
  }

  const locateFile = (modPath) => {
    const filePath = (() => {
      for (let i = 0; i < searchDirs.length; i++) {
        const d = searchDirs[i]
        let p = path.join(d, modPath)
        if (fs.existsSync(p)) return p
      }
      return undefined
    })()

    return filePath
  }

  return (req) => {
    const parsed = parseUrl(req)
    const modPath = parsed.pathname.slice(1)
    if (modPath.indexOf('/') === -1) {
      const {redirect} = resolveModule(modPath)
      return {redirect}
    } else {
      const query = querystring.parse(parsed.query)
      const filePath = locateFile(modPath)
      const modName = query.n
      const modType = query.t
      return {
        filePath,
        modName,
        modType,
      }
    }
  }
}
