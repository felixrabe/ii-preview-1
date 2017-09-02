import fs from 'fs'
import net from 'net'

import config from './config'
import log from './log'

// eslint-disable-next-line no-unused-vars
const errHandler = (socket) => (err) => {
  // console.error(err)
  socket.end()
}

const errHandler2 = (socket) => (err) => {
  console.error(err)
  socket.end()
}

const createSockServer = (makeStream) => {
  const server = new net.Server({allowHalfOpen: true})

  server.on('connection', (socket) => {
    socket
      .pipe(makeStream())
      .on('error', errHandler(socket))
      .pipe(socket)
      .on('error', errHandler2(socket))
  })

  server.listen(config.paths.sock, () => {
    log(`Listening on '${config.paths.sock}'`)
  })

  server.shutdown = () => {
    log('Shutting down')
    return new Promise(r => server.close(() => {
      fs.unlinkSync(config.paths.pid)
      r()
    }))
  }

  return server
}

export default createSockServer
