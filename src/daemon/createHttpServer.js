import connect from 'connect'
import http from 'http'

import config from './config'
import log from './log'

const createHttpServer = () => {
  const app = connect()

  return new http.Server(app).listen(config.port, 'localhost', () => {
    log(`Listening on 'localhost:${config.port}'`)
  })
}

export default createHttpServer
