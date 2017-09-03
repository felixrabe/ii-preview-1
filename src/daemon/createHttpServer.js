import connect from 'connect'
import http from 'http'
import path from 'path'
import serveStatic from 'serve-static'

import appHandler from '../../web/src/core-server/appHandler'
import config from './config'
import log from './log'

const webRoot = path.join(__dirname, '..', '..', 'web')

const createHttpServer = () => {
  const app = connect()

  app.use('/_ii', serveStatic(webRoot, {index: false}))
  app.use(appHandler)

  return new http.Server(app).listen(config.port, 'localhost', () => {
    log(`Listening on 'localhost:${config.port}'`)
  })
}

export default createHttpServer
