import fs from '@node/fs'
import mkdirp from '@node/mkdirp'
import path from '@node/path'
import url from '@node/url'

import exists from './exists'

const __filename = new url.URL(__moduleName).pathname
const __dirname = path.dirname(__filename)

const rDefaultAppRootPath = '../web/components/DefaultAppRoot.js'
const defaultAppRootPath = path.resolve(__dirname, rDefaultAppRootPath)

const appRoot = (cfg, {onMissingConfig}) => {
  const appRoot = exists(cfg, 'src', 'AppRoot.js')

  if (!appRoot.exists) {
    onMissingConfig({
      message: appRoot.fileMsg,
      create: ({log}) => {
        log(`Creating '${appRoot.path}'`)
        const defaultAppRoot = fs.readFileSync(defaultAppRootPath)
        mkdirp.sync(path.dirname(appRoot.path))
        fs.writeFileSync(appRoot.path, defaultAppRoot)
      },
    })
  }
}

export const __useDefault = appRoot
export default __useDefault
