import exists from './exists'

const nodeModules = (cfg, {onMissingConfig}) => {
  const npmDir = exists(cfg, 'node_modules')

  if (!npmDir.exists) {
    onMissingConfig({
      message: npmDir.dirMsg,
      create: ({runcmd}) => {
        runcmd('yarn')
      },
    })
  }
}

export const __useDefault = nodeModules
export default __useDefault
