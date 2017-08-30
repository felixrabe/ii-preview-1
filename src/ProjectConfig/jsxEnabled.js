import loadJspmConfig from './loadJspmConfig'
import hasDep from './hasDep'

const jsxEnabled = (cfg, {onMissingConfig}) => {
  const babelPlugin = 'babel-plugin-transform-react-jsx'
  if (!hasDep(cfg, babelPlugin)) {
    onMissingConfig({
      message: 'JSX is not enabled.',
      create: ({runcmd}) => {
        runcmd(`yarn jspm -- install npm:${babelPlugin}`)
      },
    })
  }

  loadJspmConfig(cfg, {onMissingConfig})

  const jsMeta = cfg.jspmConfig[0].packages.app.meta['*.js']
  jsMeta.babelOptions = jsMeta.babelOptions || {}
  jsMeta.babelOptions.plugins = jsMeta.babelOptions.plugins || []
  if (!jsMeta.babelOptions.plugins.includes(babelPlugin)) {
    onMissingConfig({
      message: 'JSX is not configured.',
      create: () => {
        cfg._needWriteJspmConfig = true
        jsMeta.babelOptions.plugins.push(babelPlugin)
      },
    })
  }
}

export const __useDefault = jsxEnabled
export default __useDefault
