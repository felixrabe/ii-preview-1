import jspm from '@node/jspm'
import jspmUi from '@node/jspm/lib/ui'

import commit from '../utils/commit'
import log from '../utils/log'
import yargsCheck from '../utils/yargsCheck'

jspmUi.setResolver()
jspmUi.useDefaults(false)

const override = {peerDependencies: {react: '>16.0.0-beta'}}

const jspmInstall = async (name, target, options) => {
  log(`jspm install ${name}=${target}  ${JSON.stringify(options)}`)
  await jspm.install(name, target, options)
}

const deps = {
  'react-grid-layout': [
    'react-resizable',
  ],
}

const _resolveDeps = (d, pkg) => {
  return (deps[pkg] || []).reduce(_resolveDeps, d).concat(pkg)
}

const resolveDeps = (pkg) => _resolveDeps([], pkg)

const handlePkg = async (pkg) => {
  const deps = resolveDeps(pkg)
  for (let i = 0; i < deps.length; i++) {
    const pkg = deps[i]
    await jspmInstall(pkg, `npm:${pkg}`, {override})
  }
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
