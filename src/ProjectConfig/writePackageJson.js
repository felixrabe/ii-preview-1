import fs from '@node/fs'
import path from '@node/path'

const writePackageJson = (cfg) => {
  if (cfg._needWritePackageJson) {
    const pkgPath = path.join(cfg.dir, 'package.json')
    // log(`Writing '${pkgPath}...'`)
    const packageJsonStr = JSON.stringify(cfg.packageJson, null, 2) + '\n'
    fs.writeFileSync(pkgPath, packageJsonStr)
  }
  cfg._needWritePackageJson = undefined
}

export const __useDefault = writePackageJson
export default __useDefault
