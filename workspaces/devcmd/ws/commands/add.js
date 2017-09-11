const fs = require('fs')
const glob = require('glob')
const path = require('path')

const execSync = require('../utils/execSync')
const PACKAGE_JSON = require('../utils/pkgJson')
const yarnOpts = require('../utils/yarnOpts')

const mapWorkspaces = (rootPkgJson) => {
  const map = Object.create(null)
  const cwd = path.dirname(rootPkgJson.loc)
  rootPkgJson.manifest.workspaces.forEach((wsPattern) => {
    glob.sync(wsPattern, {cwd}).forEach(ws => {
      ws = path.join(cwd, ws)
      const wsBase = path.relative(path.resolve(ws, '..', '..'), ws)
      const loc = path.join(ws, PACKAGE_JSON)
      if (fs.existsSync(loc)) {
        const manifest = JSON.parse(fs.readFileSync(loc, 'utf-8'))
        map[manifest.name] = {loc, manifest}
        map[wsBase] = {loc, manifest}
      }
    })
  })
  return map
}

const addDependency = (map, manifest, pkg, auxDeps) => {
  if (!(pkg in map)) {
    auxDeps.push(pkg)
    return manifest
  }
  pkg = map[pkg].manifest.name
  const version = map[pkg].manifest.version
  let dependencies = manifest.dependencies || {}
  dependencies = {...dependencies, [pkg]: `^${version}`}
  return {...manifest, dependencies}
}

module.exports = (match, rootPkgJson) => {
  const {ws, packages} = match
  const map = mapWorkspaces(rootPkgJson)

  const mapWs = map[ws]
  const loc = mapWs.loc

  let manifest = mapWs.manifest
  const auxDeps = []
  packages.forEach((pkg) => {
    manifest = addDependency(map, manifest, pkg, auxDeps)
  })
  fs.writeFileSync(loc, JSON.stringify(manifest, null, 2) + '\n', 'utf-8')
  if (auxDeps.length) {
    process.chdir(path.dirname(loc))
    execSync('yarn', 'add', ...yarnOpts, ...auxDeps)
  }
}

module.exports.match = (argv) => {
  const [node, wsCmd, ws, addCmd, ...packages] = argv
  if (addCmd !== 'add') return undefined
  return {ws, packages}
}
