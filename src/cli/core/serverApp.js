import connect from '@node/connect'

import appHandler from '../../server/appHandler'
import appStaticFiles from '../../server/appStaticFiles'
import iiStaticFiles from '../../server/iiStaticFiles'

const serverApp = (dir) => {
  const app = connect()

  app.use(appStaticFiles(dir))
  app.use('/_ii', iiStaticFiles)
  app.use(appHandler)

  return app
}

export const __useDefault = serverApp
export default __useDefault
