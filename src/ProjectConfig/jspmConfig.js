import {exists} from './utils'

const initCmd = 'yarn jspm -- init --yes .'

const jspmConfig = (cfg, {onMissingConfig}) => {
  const cfgFile = exists(cfg, 'jspm.config.js')
  const pkgDir = exists(cfg, 'jspm_packages')

  let didInit = false

  if (!pkgDir.exists || !cfgFile.exists) {
    onMissingConfig({
      message: pkgDir.exists ? cfgFile.fileMsg : pkgDir.dirMsg,
      create: ({runcmd}) => {
        runcmd(initCmd)
        didInit = true
      },
    })
  }

  if (!pkgDir.exists) {
    onMissingConfig({
      message: pkgDir.dirMsg,
      create: ({runcmd}) => {
        if (!didInit) runcmd(initCmd)
        didInit = true
        runcmd('yarn jspm -- install')
      },
    })
  }
}

export const __useDefault = jspmConfig
export default __useDefault
