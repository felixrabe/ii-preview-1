const fs = require('fs')
const mkdirp = require('mkdirp')
const path = require('path')

const PACKAGE_JSON = require('../utils/pkgJson')

module.exports = (match, rootPkgJson) => {
  const {packages} = match
  const prefix = rootPkgJson.manifest.name
  const version = rootPkgJson.manifest.version
  const workspaces = rootPkgJson.manifest.workspaces
  let workspacesRoot
  for (let i = 0; i < workspaces.length; i++) {
    const ws = workspaces[i]
    if (ws.endsWith('/*')) {
      workspacesRoot = ws.slice(0, -2)
      break
    }
  }
  if (!workspacesRoot) {
    throw new Error('unable to find workspaces root directory')
  }
  workspacesRoot = path.join(path.dirname(rootPkgJson.loc), workspacesRoot)
  packages.forEach((pkg) => {
    const pkgPath = path.join(workspacesRoot, pkg)
    const name = `${prefix}-${pkg}`

    const manifest = {
      name,
      version,
      private: true,
      license: 'UNLICENSED',
    }

    if (fs.existsSync(pkgPath)) {
      // skip
      return
    }

    console.log(pkgPath)
    mkdirp.sync(pkgPath)
    const loc = path.join(pkgPath, PACKAGE_JSON)
    fs.writeFileSync(loc, JSON.stringify(manifest, null, 2) + '\n', 'utf-8')
  })
}

module.exports.match = (argv) => {
  const [node, wsCmd, newCmd, ...packages] = argv
  if (newCmd !== 'new') return undefined
  return {packages}
}
