import fs from '@node/fs'
import path from '@node/path'

const writePackageJson = (cfg) => {
  if (cfg._needWritePackageJson) {
    cfg._needWritePackageJson = undefined
    const pkgPath = path.join(cfg.dir, 'package.json')
    // log(`Writing '${pkgPath}...'`)
    const packageJsonStr = JSON.stringify(cfg.packageJson, null, 2) + '\n'
    fs.writeFileSync(pkgPath, packageJsonStr)
  }
}

export const __useDefault = writePackageJson
export default __useDefault
