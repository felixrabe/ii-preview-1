import fs from 'fs'
import net from 'net'

import config from '../config'
import log from '../util/log'
import makeStream from './makeStream'

// eslint-disable-next-line no-unused-vars
const errHandler = (socket) => (err) => {
  // console.error(err)
  socket.end()
}

const errHandler2 = (socket) => (err) => {
  console.error(err)
  socket.end()
}

const createSockServer = () => {
  const server = new net.Server({allowHalfOpen: true})

  server.on('connection', (socket) => {
    socket
      .pipe(makeStream())
      .on('error', errHandler(socket))
      .pipe(socket)
      .on('error', errHandler2(socket))
  })

  server.listen(config.paths.sock, () => {
    log(`Socket server listening on '${config.paths.sock}'`)
  })

  server.shutdown = () => {
    log('Socket server shutting down')
    return new Promise(r => server.close(() => {
      fs.unlinkSync(config.paths.pid)
      r()
    }))
  }

  return server
}

export default createSockServer
