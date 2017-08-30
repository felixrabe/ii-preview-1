export const hasDep = (cfg, dep) => {
  const jspm = cfg.packageJson.jspm || {}
  return (
    dep in (jspm.dependencies || {}) || dep in (jspm.peerDependencies || {})
  )
}
