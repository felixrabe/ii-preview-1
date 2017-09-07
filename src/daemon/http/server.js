import connect from 'connect'
import fs from 'fs'
import http from 'http'
import path from 'path'
import serveStatic from 'serve-static'

import config from '../config'
import appRoot from '../util/appRoot'
import log from '../util/log'
import apiHandler from './apiHandler'
import {reloadingHttpHandler} from './reloadingHttpHandler'

const srcPath = path.join(appRoot, 'src')
const serveStaticAt = (p) => serveStatic(p, {index: false})

const mainHandler = (req, res) => reloadingHttpHandler(req, res)

const createHttpServer = () => {
  const app = connect()

  app.use('/_i', apiHandler)
  app.use('/_j', serveStaticAt(path.join(appRoot, 'jspm_packages')))
  app.use('/_n', serveStaticAt(path.join(appRoot, 'node_modules')))
  app.use('/_w', serveStaticAt(path.join(srcPath, 'web')))
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
