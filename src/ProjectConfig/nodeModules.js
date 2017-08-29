import fs from '@node/fs'
import path from '@node/path'

const nodeModules = (cfg, {onMissingConfig}) => {
  const npmDir = path.join(cfg.dir, 'node_modules')
  if (!fs.existsSync(npmDir)) {
    onMissingConfig({
      message: `Directory '${npmDir}' does not exist.`,
      create: ({runcmd}) => {
        console.log('nodeModules', runcmd)
        runcmd('yarn')
        console.log('nodeModules')
      },
    })
  }
}

export const __useDefault = nodeModules
export default __useDefault
