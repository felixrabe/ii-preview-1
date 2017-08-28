import path from '@node/path'
import readPkgUp from '@node/read-pkg-up'
import stripIndent from '@node/strip-indent'

export const checkPackageJson = (dir) => {
  let {pkg, path: pkgPath} = readPkgUp.sync({cwd: dir, normalize: false})
  if (!pkg) {
    throw new Error(stripIndent(`
      No package.json found at ${dir}.
      Run 'ii init' to initialize a project.
    `).trim())
  }
  return {dir: path.dirname(pkgPath), pkg, pkgPath}
}

export const checkIIConfiguration = (pkg, realDir) => {
  if (!pkg.ii) {
    throw new Error(stripIndent(`
      package.json without 'ii' configuration found at ${realDir}.
      Run 'ii init' to initialize a project.
    `).trim())
  }
}
