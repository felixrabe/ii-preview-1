import fs from '@node/fs'
import mkdirp from '@node/mkdirp'

const directoryExists = (cfg, {onMissingConfig}) => {
  if (!fs.existsSync(cfg.dir)) {
    onMissingConfig({
      message: `Directory '${cfg.dir}' does not exist.`,
      create: ({log}) => {
        log(`$ mkdir -p '${cfg.dir}'`)
        mkdirp.sync(cfg.dir)
      },
    })
  }
}

export const __useDefault = directoryExists
export default __useDefault
