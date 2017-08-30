import loadJspmConfig from './loadJspmConfig'
import hasDep from './hasDep'

const cssLoaderInstalled = (cfg, {onMissingConfig}) => {
  if (!hasDep(cfg, 'css')) {
    onMissingConfig({
      message: 'CSS loader is not installed.',
      create: ({runcmd}) => {
        runcmd('yarn jspm -- install css')
      },
    })
  }

  loadJspmConfig(cfg, {onMissingConfig})

  const appMeta = cfg.jspmConfig[0].packages.app.meta
  if (!('*.css' in appMeta)) {
    onMissingConfig({
      message: 'CSS loader is not configured.',
      create: () => {
        cfg._needWriteJspmConfig = true
        appMeta['*.css'] = {
          loader: 'css',
        }
      },
    })
  }
}

export const __useDefault = cssLoaderInstalled
export default __useDefault
