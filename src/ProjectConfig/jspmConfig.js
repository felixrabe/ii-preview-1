import {exists} from './utils'

const jspmConfig = (cfg, {onMissingConfig}) => {
  const cfgFile = exists(cfg, 'jspm.config.js')

  if (!cfgFile.exists) {
    onMissingConfig({
      message: cfgFile.fileMsg,
      create: ({runcmd}) => {
        runcmd('yarn jspm -- init --yes .')
      },
    })
  }
}

export const __useDefault = jspmConfig
export default __useDefault
