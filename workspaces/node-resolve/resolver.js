const fs = require('fs')
const glob = require('glob')
const path = require('path')

module.exports = (parentMod) => {
  require(parentMod)
  parentMod = require.cache[require.resolve(parentMod)]

  const parentModDir = path.dirname(parentMod.filename)

  const searchDirs = [...Array(3)].reduce((searchDirs, _, i) => {
    const p = path.resolve(parentModDir, ...[...Array(i)].map(() => '..'))
    const s = glob.sync('node_modules', {cwd: p})
    return searchDirs.concat(s.map(d => path.resolve(p, d)))
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
