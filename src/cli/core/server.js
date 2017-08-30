import connect from '@node/connect'

import appHandler from '../../server/appHandler'
import appStaticFiles from '../../server/appStaticFiles'
import iiStaticFiles from '../../server/iiStaticFiles'

const server = (dir) => {
  const app = connect()

  app.use(appStaticFiles(dir))
  app.use('/_ii', iiStaticFiles)
  app.use(appHandler)

  return app
}

export const __useDefault = server
export default __useDefault
