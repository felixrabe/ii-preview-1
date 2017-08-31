import jspm from '@node/jspm'
import jspmUi from '@node/jspm/lib/ui'

import commit from '../utils/commit'
import log from '../utils/log'
import yargsCheck from '../utils/yargsCheck'

jspmUi.setResolver()
jspmUi.useDefaults(false)

const jspmInstall = async (name, target, options = {}) => {
  log(`jspm install ${name}=${target}  ${JSON.stringify(options)}`)
  await jspm.install(name, target, options)
}

const reactPeerOverride = {peerDependencies: {react: '>16.0.0-beta'}}

const packages = {
  'react-grid-layout': {
    deps: ['react-resizable'],
    options: {
      override: {...reactPeerOverride,
        meta: {
          '*.css': {loader: 'css'},
          '*.js': {globals: {process: 'process'}},
        },
      },
    },
  },
  'react-redux': {
    options: {
      override: reactPeerOverride,
    },
  },
  'react-resizable': {
    options: {
      override: {...reactPeerOverride,
        meta: {
          '*.css': {loader: 'css'},
        },
      },
    },
  },
}

const handlePkg = async (pkg) => {
  const pkgInfo = packages[pkg] || {}
  for (let i = 0; i < (pkgInfo.deps || []).length; i++) {
    await handlePkg(pkgInfo.deps[i])
  }
  await jspmInstall(pkg, `npm:${pkg}`, pkgInfo.options || {})
}

const command = {
  command: ['install <package>'],
  describe: 'Install package',
  builder: (yargs) => (
    yargs
      .check(yargsCheck)
  ),
  handler: async (argv) => {
    try {
      log(`Installing ${argv.package}...`)
      await commit(argv.dir, 'pre install')
      await handlePkg(argv.package)
      await commit(argv.dir, `install ${argv.package}`)
      log('Done.')
    } catch (err) {
      log.error(err)
    }
  },
}

export const __useDefault = command
export default __useDefault
