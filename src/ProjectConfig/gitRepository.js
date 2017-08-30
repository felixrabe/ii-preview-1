import {exists} from './utils'

const gitRepository = (cfg, {onMissingConfig}) => {
  const gitDir = exists(cfg, '.git')

  if (!gitDir.exists) {
    onMissingConfig({
      message: `Directory '${gitDir}' does not exist.`,
      create: ({runcmd}) => {
        runcmd('git init')
      },
    })
  }
}

export const __useDefault = gitRepository
export default __useDefault
