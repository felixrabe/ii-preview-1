import fs from '@node/fs'

import {exists} from './utils'

const gitIgnore = (cfg, {onMissingConfig}) => {
  const gitIgnore = exists(cfg, '.gitignore')

  if (!gitIgnore.exists) {
    onMissingConfig({
      message: gitIgnore.fileMsg,
      create: ({log}) => {
        log(`Creating '${gitIgnore.path}'`)
        fs.writeFileSync(gitIgnore.path, '/jspm_packages/\n/node_modules/\n')
      },
    })
  }
}

export const __useDefault = gitIgnore
export default __useDefault
