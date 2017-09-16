const net = require('net')
const path = require('path')

const handleConnectionExec = require('./handleConnectionExec')
const onShutdown = require('./onShutdown')
const parseArguments = require('./parseArguments')
const removeSocket = require('./removeSocket')

const netOpts = {allowHalfOpen: true}

module.exports = () => {
  const {scriptPath, sockPath, args} = parseArguments()

  const server = net.createServer(netOpts, handleConnectionExec(scriptPath))

  server.listen(sockPath, () => {
    console.log('mono.js:', `Server ready at '.../${path.basename(sockPath)}'.`)
  })

  const closePromise = new Promise(r => server.on('close', r))

  onShutdown(async () => {
    console.log('mono.js:', 'Server shutting down...')
    server.close()
    await closePromise
    removeSocket(sockPath)
    console.log('mono.js:', 'Server shut down.')
  })
}
