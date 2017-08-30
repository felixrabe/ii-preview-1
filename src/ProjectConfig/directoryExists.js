import mkdirp from '@node/mkdirp'

import exists from './exists'

const directoryExists = (cfg, {onMissingConfig}) => {
  const dir = exists(cfg, '.')

  if (!dir.exists) {
    onMissingConfig({
      message: dir.dirMsg,
      create: ({log}) => {
        log(`$ mkdir -p '${dir.path}'`)
        mkdirp.sync(dir.path)
      },
    })
  }
}

export const __useDefault = directoryExists
export default __useDefault
