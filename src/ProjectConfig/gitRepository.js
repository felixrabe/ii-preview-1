import fs from '@node/fs'
import path from '@node/path'

const gitRepository = (cfg, {onMissingConfig}) => {
  const gitDir = path.join(cfg.dir, '.git')

  if (!fs.existsSync(gitDir)) {
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
