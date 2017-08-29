import path from '@node/path'
import readPkgUp from '@node/read-pkg-up'

const packageJson = (cfg, {onMissingConfig}) => {
  let pkg = readPkgUp.sync({cwd: cfg.dir, normalize: false})

  if (!pkg.pkg) {
    onMissingConfig({
      message: `No package.json found at '${cfg.dir}'.`,
      create: ({log}) => {
        cfg._needWritePackageJson = true
        log('Creating package.json...')
        pkg.pkg = {
          name: 'app',
          version: '0.0.0',
          private: true,
          license: 'UNLICENSED',
        }
        pkg.path = path.join(cfg.dir, 'package.json')
      },
    })
  }

  Object.assign(cfg, {
    dir: path.dirname(pkg.path),
    packageJson: pkg.pkg,
  })
}

export const __useDefault = packageJson
export default __useDefault
