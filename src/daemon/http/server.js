import connect from 'connect'
import fs from 'fs'
import http from 'http'
import path from 'path'
import serveStatic from 'serve-static'
import url from 'url'

import config from '../config'
import log from '../util/log'
import apiHandler from './apiHandler'
import {reloadingHttpHandler} from './reloadingHttpHandler'

const __filename = new url.URL(__moduleName).pathname
const __dirname = path.dirname(__filename)
const appRoot = path.join(__dirname, '..', '..')
const srv = (...p) => serveStatic(path.join(appRoot, ...p), {index: false})

const mainHandler = (req, res) => reloadingHttpHandler(req, res)

const createHttpServer = () => {
  const app = connect()

  app.use('/_i', apiHandler)
  app.use('/_j', srv('jspm_packages'))
  app.use('/_n', srv('node_modules'))
  app.use(mainHandler)

  const server = new http.Server(app)

  server.listen(config.httpPort, config.httpHost, () => {
    log(`HTTP server listening on 'localhost:${config.httpPort}'`)
  })

  server.shutdown = () => {
    log('HTTP server shutting down')
    return new Promise(r => server.close(r))
  }

  return server
}

export default createHttpServer
