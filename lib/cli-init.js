import fs from '@node/fs'
import mkdirp from '@node/mkdirp'
import path from '@node/path'
import readPkgUp from '@node/read-pkg-up'

import log from './cliLog'
import commit from './ii-commit'
import runCommandSync from './runCommandSync'

let needWritePackageJson = false

const ensurePackageJson = (dir) => {
  if (!fs.existsSync(dir)) {
    log(`$ mkdir -p '${dir}'`)
    mkdirp.sync(dir)
  }
  let {pkg, path: pkgPath} = readPkgUp.sync({cwd: dir, normalize: false})
  if (!pkg) {
    needWritePackageJson = true
    log('Creating package.json')
    pkg = {}
    pkgPath = path.join(dir, 'package.json')
  }
  return {dir: path.dirname(pkgPath), pkg, pkgPath}
}

const ensureIIConfiguration = (pkg) => {
  if (!pkg.ii) {
    needWritePackageJson = true
    log('Creating ii configuration')
    pkg.ii = {}
  }
  return pkg.ii
}

const writePackageJson = (pkgPath, pkg) => {
  if (needWritePackageJson) {
    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n')
    log(`Updated '${pkgPath}'`)
  }
}

const ensureGitIgnore = (dir) => {
  const gitIgnore = path.join(dir, '.gitignore')
  if (!fs.existsSync(gitIgnore)) {
    log(`Creating '${gitIgnore}'`)
    fs.writeFileSync(gitIgnore, '/jspm_packages/\n/node_modules/\n')
  }
}

const ensureGitRepository = (dir) => {
  const gitDir = path.join(dir, '.git')
  if (!fs.existsSync(gitDir)) {
    runCommandSync('git init')
  }
}

const ensureNodeModulesDir = (dir) => {
  const npmDir = path.join(dir, 'node_modules')
  if (!fs.existsSync(npmDir)) {
    runCommandSync('yarn')
  }
}

const ensureJspmInstalled = (dir) => {
  const jspmPackageDir = path.join(dir, 'node_modules', 'jspm')
  if (!fs.existsSync(jspmPackageDir)) {
    runCommandSync('yarn add jspm@beta')
  }
}

const ensureJspmConfigured = (dir) => {
  const jspmConfigFile = path.join(dir, 'jspm.config.js')
  if (!fs.existsSync(jspmConfigFile)) {
    runCommandSync('yarn jspm -- init --yes .')
  }
  const jspmDir = path.join(dir, 'jspm_packages')
  if (!fs.existsSync(jspmDir)) {
    runCommandSync('yarn jspm -- install')
  }
}

const initialize = (argv) => {
  const {dir, pkg, pkgPath} = ensurePackageJson(argv.dir)
  process.chdir(dir)
  // eslint-disable-next-line no-unused-vars
  const cfg = ensureIIConfiguration(pkg)
  writePackageJson(pkgPath, pkg)
  ensureNodeModulesDir(dir)
  ensureJspmInstalled(dir)
  ensureJspmConfigured(dir)
  ensureGitIgnore(dir)
  ensureGitRepository(dir)
  commit(dir, 'init')
}

export default {
  command: ['init [dir]'],
  describe: 'Initialize project',
  builder: (yargs) => (
    yargs
  ),
  handler: (argv) => {
    try {
      initialize(argv)
      log('Done')
    } catch (err) {
      log(err)
    }
  },
}
