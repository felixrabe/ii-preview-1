const fs = require('fs')
const path = require('path')

const PACKAGE_JSON = require('./pkgJson')

module.exports = function findToplevelPkgJson(p = process.cwd()) {
  const loc = path.join(p, PACKAGE_JSON)
  if (fs.existsSync(loc)) {
    const manifest = JSON.parse(fs.readFileSync(loc, 'utf-8'))
    if (manifest.workspaces) {
      return {loc, manifest}
    }
  }
  const up = path.join(p, '..')
  if (up === p) return undefined
  return findToplevelPkgJson(up)
}
