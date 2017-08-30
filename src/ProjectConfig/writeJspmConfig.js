import fs from '@node/fs'
import path from '@node/path'

import log from '../cli/utils/log'

const stringifyJspmConfig = (cfg) => (
  cfg.jspmConfig.map((config) => (
    `SystemJS.config(${
      JSON.stringify(config, null, 2).replace(/^ {2}"(\w+)"/mg, '  $1')
    });\n`
  )).join('\n')
)

const writeJspmConfig = (cfg) => {
  if (cfg._needWriteJspmConfig) {
    cfg._needWriteJspmConfig = undefined
    const cfgPath = path.join(cfg.dir, 'jspm.config.js')
    log(`Writing '${cfgPath}...'`)
    fs.writeFileSync(cfgPath, stringifyJspmConfig(cfg))
  }
}

export const __useDefault = writeJspmConfig
export default __useDefault
