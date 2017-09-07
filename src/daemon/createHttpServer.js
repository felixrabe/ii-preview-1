import connect from 'connect'
import fs from 'fs'
import http from 'http'
import path from 'path'
import serveStatic from 'serve-static'
import url from 'url'

// import apiHandlerFactory from '../../web/src/core-server/apiHandlerFactory'
import config from './config'
import log from './log'
import {reloadingHttpHandler} from './reloadingHttpHandler'

const __filename = new url.URL(__moduleName).pathname
const __dirname = path.dirname(__filename)
const webRoot = path.join(__dirname, '..', '..', 'web')

const mainHandler = (req, res) => reloadingHttpHandler(req, res)

const createHttpServer = () => {
  const app = connect()

  // app.use('/_i', apiHandlerFactory(config))
  app.use('/_s', serveStatic(webRoot, {index: false}))
  app.use(mainHandler)

  return new http.Server(app).listen(config.port, config.host, () => {
    log(`Listening on 'localhost:${config.port}'`)
  })
}

export default createHttpServer
