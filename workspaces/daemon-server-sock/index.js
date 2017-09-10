const fs = require('fs')
const net = require('net')

const config = require('ii-1-daemon-config')
const log = require('ii-1-daemon-log')

const makeStream = require('./makeStream')

// eslint-disable-next-line no-unused-vars
const errHandler = (socket) => (err) => {
  // console.error(err)
  socket.end()
}

const errHandler2 = (socket) => (err) => {
  console.error(err)
  socket.end()
}

module.exports = function createSockServer() {
  const server = new net.Server({allowHalfOpen: true})

  server.on('connection', (socket) => {
    socket
      .pipe(makeStream())
      .on('error', errHandler(socket))
      .pipe(socket)
      .on('error', errHandler2(socket))
  })

  const _listen = server.listen.bind(server)
  server.listen = (cb) => {
    _listen(config.paths.sock, () => {
      fs.writeFileSync(config.paths.pid, '' + process.pid)
      log(`Socket server listening on '${config.paths.sock}'`)
      cb && cb()
    })
  }

  const _close = server.close.bind(server)
  server.close = (cb) => {
    log('Socket server shutting down')
    return _close(() => {
      fs.unlinkSync(config.paths.pid)
      return cb && cb()
    })
  }

  return server
}
