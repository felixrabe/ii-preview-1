import connect from '@node/connect'

import appHandler from '../../web/appHandler'
import appStaticFiles from '../../web/appStaticFiles'
import iiStaticFiles from '../../web/iiStaticFiles'
import log from '../utils/log'
import yargsCheck from '../utils/yargsCheck'
import yargsPortCheck from '../utils/yargsPortCheck'

const server = (dir) => {
  const app = connect()

  app.use(appStaticFiles(dir))
  app.use('/_ii', iiStaticFiles)
  app.use(appHandler)

  return app
}

const command = {
  command: ['server [dir]', 'serve'],
  describe: 'Start server',
  builder: (yargs) => (
    yargs
      .option({
        port: {
          alias: 'p',
          default: 8080,
          type: 'number',
        },
      })
      .check(yargsCheck)
      .check(yargsPortCheck)
  ),
  handler: async (argv) => {
    server(argv.dir).listen(argv.port, 'localhost', () => {
      log(`Serving '${argv.dir}' on port ${argv.port}`)
    })
  },
}

export const __useDefault = command
export default __useDefault
