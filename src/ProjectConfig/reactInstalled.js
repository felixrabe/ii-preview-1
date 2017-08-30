import hasDep from './hasDep'

const reactInstalled = (cfg, {onMissingConfig}) => {
  if (!hasDep(cfg, 'react')) {
    onMissingConfig({
      message: 'React is not installed.',
      create: ({runcmd}) => {
        runcmd('yarn jspm -- install -y react@next react-dom@next')
      },
    })
  }
}

export const __useDefault = reactInstalled
export default __useDefault
