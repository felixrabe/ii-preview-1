const fs = require('fs')
const mkdirp = require('mkdirp')
const path = require('path')
const rimraf = require('rimraf')
const serveStatic = require('serve-static')
const touch = require('touch')

const md5 = require('./md5')
const rollFactory = require('./rollFactory')

const top = __dirname
const stdlib = path.resolve(top, 'build')
const roll = rollFactory(stdlib)

const main = async () => {
  const hash = md5(fs.readFileSync(__filename, 'utf-8'))
  const hashFile = path.resolve(stdlib, '.build-' + hash)
  if (fs.existsSync(hashFile)) return

  rimraf.sync(stdlib)
  mkdirp.sync(stdlib)
  process.chdir(stdlib)

  await roll('d3', {
    virtual: `export * from 'd3'\n`,
  })

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

  touch.sync(hashFile)
}

const mainDone = main()
mainDone.catch((err) => {console.error(err)})

module.exports = async (...aa) => { await mainDone ; return serveStatic(stdlib)(...aa) }
