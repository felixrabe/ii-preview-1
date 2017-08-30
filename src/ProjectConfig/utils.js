import fs from '@node/fs'
import path from '@node/path'

export const exists = (cfg, ...f) => {
  const fPath = path.join(cfg.dir, ...f)
  const exists = fs.existsSync(fPath)
  const fileMsg = `File '${fPath}' does not exist.`
  const dirMsg = `Directory '${fPath}' does not exist.`

  return {path: fPath, exists, fileMsg, dirMsg}
}

export const hasDep = (cfg, dep) => {
  const jspm = cfg.packageJson.jspm || {}
  return (
    dep in (jspm.dependencies || {}) || dep in (jspm.peerDependencies || {})
  )
}
