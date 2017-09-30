const mkdirp = require('mkdirp')
const path = require('path')
const rimraf = require('rimraf')
const serveStatic = require('serve-static')

module.exports = (top, main) => {
  const srcDir = path.resolve(top, 'src')
  const buildDir = path.resolve(top, 'build')

  rimraf.sync(buildDir)
  mkdirp.sync(buildDir)
  console.log(`Building ${buildDir}...`)

  const mainDone = main({srcDir, buildDir})
  mainDone.catch((err) => {console.error(err)})

  const ss = serveStatic(buildDir)

  return async (req, res, next) => {
    await mainDone
    return ss(req, res, next)
  }
}
