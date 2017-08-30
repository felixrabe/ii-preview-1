const hasDep = (cfg, dep) => {
  const jspm = cfg.packageJson.jspm || {}
  return (
    dep in (jspm.dependencies || {}) || dep in (jspm.peerDependencies || {})
  )
}

export const __useDefault = hasDep
export default __useDefault
