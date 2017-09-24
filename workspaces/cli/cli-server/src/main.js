const net = require('net')
const path = require('path')

const onShutdown = require('ii-on-shutdown')

const handleConnection = require('./handleConnection')
const parseArguments = require('./parseArguments')
const removeSocket = require('./removeSocket')

const netOpts = { allowHalfOpen: true }

module.exports = () => {
  const {scriptPath, sockPath, opts} = parseArguments()
  if (opts.force) removeSocket(sockPath)

  const server = net.createServer(netOpts, handleConnection(scriptPath))

  server.listen(sockPath, () => {
    const sockPath_ = path.basename(sockPath)
    console.log('main.js:', `Started '.../${sockPath_}'.`)
  })

  const closePromise = new Promise(r => server.on('close', r))

  onShutdown(async () => {
    console.log('main.js:', 'Stopping...')
    server.close()
    await closePromise
    removeSocket(sockPath)
    console.log('main.js:', 'Stopped.')
  })
}
