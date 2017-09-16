const net = require('net')
const path = require('path')

const endable = require('./endable')
const executeScript = require('./executeScript')
const handleConnectionExec = require('./handleConnectionExec')
const onShutdown = require('./onShutdown')
const parseArguments = require('./parseArguments')
const removeSocket = require('./removeSocket')

// const netOpts = {allowHalfOpen: true, pauseOnConnect: true}
const netOpts = {allowHalfOpen: true}

module.exports = () => {
  const {scriptPath, sockPath, args} = parseArguments()
  if (!process.send) {  // not a child process
    return require('./callMain')(directMain, scriptPath, sockPath, args)
  }

  const server = net.createServer(netOpts, handleConnectionExec(scriptPath))

  removeSocket(sockPath)
  server.listen(sockPath, () => {
    console.log('child.js:', `Server ready at '.../${path.basename(sockPath)}'.`)
  })

  process.on('message', (message) => {
    if (message === 'ready?') {
      process.send('ready!')
    }
  })

  const closePromise = new Promise(r => server.on('close', r))

  onShutdown(async () => {
    console.log('child.js:', 'Server shutting down...')
    // console.log('child.js:', 'CHILD SHUTDOWN')
    server.close()
    await closePromise
    removeSocket(sockPath)
    console.log('child.js:', 'Server shut down.')
  })
}

const directMain = (scriptPath, sockPath, args) => {
  const cwd = process.cwd()
  const options = {
    inStream: process.stdin,
    outStream: endable(process.stdout),
    errStream: process.stderr,
    cwd,
  }
  executeScript(scriptPath, args, options)
}
