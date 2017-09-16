const exitProcess = () => process.exit()

const killProcess = (signal) => () => process.kill(process.pid, signal)

module.exports = (shutdown) => {
  let shutdownCalled = false

  const createSigHandler = (name, quit = exitProcess) => () => {
    console.log('onShutdown.js:', name)
    if (!shutdownCalled) shutdown().then(quit)
    else quit()
    shutdownCalled = true
  }

  process.on('SIGINT', createSigHandler('SIGINT'))
  process.on('SIGTERM', createSigHandler('SIGTERM'))
  // for nodemon
  process.once('SIGUSR2', createSigHandler('SIGUSR2', killProcess('SIGUSR2')))
}
