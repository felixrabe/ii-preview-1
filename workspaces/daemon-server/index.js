const createHttpServer = require('ii-1-daemon-server-http')
const createSockServer = require('ii-1-daemon-server-sock')
const multiserver = require('ii-1-multiserver')

module.exports = function createServer() {
  return multiserver([createSockServer(), createHttpServer()])
}
