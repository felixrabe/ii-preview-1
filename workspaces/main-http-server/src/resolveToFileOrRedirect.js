const fs = require('fs')
const parseUrl = require('parseurl')
const path = require('path')
const querystring = require('querystring')

const uiMod = require('../ui/_thisMod')
const resolver = resolverFactory(uiMod)

const resolveCache = Object.create(null)

module.exports = (req) => {
  const {modName} = parseReq(req)
  const resolved = tryResolve(modName, uiMod)
  return resolved
}

const parseReq = (req) => {
  const parsed = parseUrl(req)
  const modName = parsed.pathname.slice(1)
  return {modName}
}

const tryResolve = (modName, parentMod) => {
  if (modName in resolveCache) return resolveCache[modName]
  const result = modName + '/foo'
  resolveCache[modName] = result
  return result
}



const resolverFactory = (parentMod) => {
  const parentModDir = path.dirname(parentMod.filename)

  const searchDirs = [...Array(3)].reduce((searchDirs, _, i) => {
    const p = path.resolve(parentModDir, ...[...Array(i)].map(() => '..'))
    // const s = glob.sync('node_modules', {cwd: p})
    // return searchDirs.concat(s.map(d => path.resolve(p, d)))
    return searchDirs.concat()
  }, [])

  return (modName) => {
    const pkgJsonPath = (() => {
      for (let i = 0; i < searchDirs.length; i++) {
        const d = searchDirs[i]
        let p = path.join(d, modName, 'package.json')
        if (fs.existsSync(p)) return p
        p = path.join(d, modName)
        if (fs.existsSync(p)) return p
      }
      return undefined
    })()

    if (path.basename(pkgJsonPath) !== 'package.json') {
      return {
        modType: 'fromQuery',
        modPath: pkgJsonPath,
        redirect: false,
      }
    }

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

    modPath = path.join(pkgJsonDir, modPath)

    return {
      modType,
      modPath,
      redirect: true,
    }

    // return {
    //   searchDirs,
    //   modName,
    //   pkgJsonPath,
    //   modType,
    //   modPath,
    //   // pkgJson,
    // }
    // return modPath
  }
}
