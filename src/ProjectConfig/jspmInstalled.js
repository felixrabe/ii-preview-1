import exists from './exists'

const jspmInstalled = (cfg, {onMissingConfig}) => {
  const jspmPackageDir = exists(cfg, 'node_modules', 'jspm')

  if (!jspmPackageDir.exists) {
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
