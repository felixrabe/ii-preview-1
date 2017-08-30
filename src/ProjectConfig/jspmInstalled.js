import fs from '@node/fs'
import path from '@node/path'

const jspmInstalled = (cfg, {onMissingConfig}) => {
  const jspmPackageDir = path.join(cfg.dir, 'node_modules', 'jspm')
  if (!fs.existsSync(jspmPackageDir)) {
    onMissingConfig({
      message: 'jspm is not installed.',
      create: ({runcmd}) => {
        runcmd('yarn add jspm@beta')
      },
    })
  }
}

export const __useDefault = jspmInstalled
export default __useDefault
