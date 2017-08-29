import fs from '@node/fs'
import path from '@node/path'

const gitIgnore = (cfg, {onMissingConfig}) => {
  const gitIgnore = path.join(cfg.dir, '.gitignore')
  if (!fs.existsSync(gitIgnore)) {
    onMissingConfig({
      message: `File '${gitIgnore}' does not exist.`,
      create: ({log}) => {
        log(`Creating '${gitIgnore}'`)
        fs.writeFileSync(gitIgnore, '/jspm_packages/\n/node_modules/\n')
      },
    })
  }
}

export const __useDefault = gitIgnore
export default __useDefault
