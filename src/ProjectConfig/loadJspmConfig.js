import fs from '@node/fs'
import path from '@node/path'

const loadJspmConfig = (cfg) => {
  const jspmConfigFile = path.join(cfg.dir, 'jspm.config.js')

  cfg.jspmConfig = []
  const SystemJS = {  // eslint-disable-line no-unused-vars
    config: (config) => {
      cfg.jspmConfig.push(config)
    },
  }
  eval(fs.readFileSync(jspmConfigFile, 'utf-8'))
}

export const __useDefault = loadJspmConfig
export default __useDefault
