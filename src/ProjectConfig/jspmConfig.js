import fs from '@node/fs'
import path from '@node/path'

const jspmConfig = (cfg, {onMissingConfig}) => {
  const jspmConfigFile = path.join(cfg.dir, 'jspm.config.js')
  if (!fs.existsSync(jspmConfigFile)) {
    onMissingConfig({
      message: `File '${jspmConfigFile}' does not exist.`,
      create: ({runcmd}) => {
        runcmd('yarn jspm -- init --yes .')
      },
    })
  }

  const jspmDir = path.join(cfg.dir, 'jspm_packages')
  if (!fs.existsSync(jspmDir)) {
    onMissingConfig({
      message: `Directory '${jspmDir}' does not exist.`,
      create: ({runcmd}) => {
        runcmd('yarn jspm -- install')
      },
    })
  }
}

export const __useDefault = jspmConfig
export default __useDefault
