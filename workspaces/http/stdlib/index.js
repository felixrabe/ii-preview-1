const fs = require('fs')
const mkdirp = require('mkdirp')
const path = require('path')
const rimraf = require('rimraf')
const rollup = require('rollup')
const serveStatic = require('serve-static')
const touch = require('touch')

const rpCommonjs = require('rollup-plugin-commonjs')
const rpNodeResolve = require('rollup-plugin-node-resolve')
const rpReplace = require('rollup-plugin-replace')
const rpVirtual = require('rollup-plugin-virtual')

const md5 = require('./md5')

const top = __dirname
const stdlib = path.resolve(top, 'build')

const rpImportAlias = (opts) => {
  if (typeof opts !== 'object') return {}

  return {
    resolveId(importee, importer) {
      let found = undefined
      Object.keys(opts).find((key) => {
        if (importee !== key) return false
        const p = opts[key]
        if (!fs.existsSync(p)) return false
        found = p
        return true
      })
      return found
    }
  }
}

const main = async () => {
  const hash = md5(fs.readFileSync(__filename, 'utf-8'))
  const hashFile = path.resolve(stdlib, '.build-' + hash)
  if (fs.existsSync(hashFile)) return

  rimraf.sync(stdlib)
  mkdirp.sync(stdlib)
  touch.sync(hashFile)
  process.chdir(stdlib)

  await roll('react', {
    modPath: 'react/umd/react.development.js',
    namedExports: Object.keys(require('react')),
  })

  await roll('react-dom', {
    external: [path.resolve(stdlib, 'react.mjs')],
    importAlias: {
      'react': path.resolve(stdlib, 'react.mjs'),
    },
    modPath: 'react-dom/umd/react-dom.development.js',
    namedExports: Object.keys(require('react-dom')),
  })

  await roll('react-dom--server', {
    external: [path.resolve(stdlib, 'react.mjs')],
    importAlias: {
      'react': path.resolve(stdlib, 'react.mjs'),
    },
    modPath: 'react-dom/umd/react-dom-server.browser.development.js',
  })

  await roll('react-redux', {
    external: [path.resolve(stdlib, 'react.mjs')],
    importAlias: {
      'react': path.resolve(stdlib, 'react.mjs'),
    },
    virtual: `export * from 'react-redux'\n`,
  })

  await roll('redux', {
    virtual: `export * from 'redux'\n`,
  })
}

const roll = async (modName, {external, importAlias, modPath, namedExports, virtual, virtualAlias} = {}) => {
  if (!modPath) modPath = modName

  if (namedExports) {
    namedExports = {[modPath]: namedExports}
  }

  const filename = `${modName}.mjs`
  console.log(`Compiling ${filename}...`)

  virtualAlias = virtualAlias || {}
  virtualAlias[filename] = modPath

  if (typeof virtual === 'string')
    virtual = {[filename]: virtual}

  const virt = Object.assign(
    Object.keys(virtualAlias).reduce((virt, k) => {
      const m = JSON.stringify(virtualAlias[k])
      virt[k] = `export * from ${m}\nexport {default} from ${m}\n`
      return virt
    }, Object.create(null)),
    virtual || {},
  )

  const bundle = await rollup.rollup({
    input: filename,
    plugins: [
      rpReplace({ values: {
        'process.env.NODE_ENV': JSON.stringify('development'),
      }}),
      rpVirtual(virt),
      rpImportAlias(importAlias),
      rpNodeResolve(),
      rpCommonjs({
        namedExports,
      }),
    ],
    external,
  })

  await bundle.write({
    file: path.resolve(stdlib, filename),
    format: 'es',
  })
}

const mainDone = main()
mainDone.catch((err) => {console.error(err)})

module.exports = async (...aa) => { await mainDone ; return serveStatic(stdlib)(...aa) }
