import fs from '@node/fs'
import path from '@node/path'

const exists = (cfg, ...f) => {
  const fPath = path.join(cfg.dir, ...f)
  const exists = fs.existsSync(fPath)
  const fileMsg = `File '${fPath}' does not exist.`
  const dirMsg = `Directory '${fPath}' does not exist.`

  return {path: fPath, exists, fileMsg, dirMsg}
}

export const __useDefault = exists
export default __useDefault
