module.exports = (shutdown) => {
  let down = false

  const createSigHandler = (sig) => {
    const quit = () => process.kill(process.pid, sig)
    process.once(sig, () => {
      console.log('onShutdown.js:', `sig: ${sig} - down: ${down}`)
      if (!down) shutdown().then(quit)
      else quit()
      down = true
    })
  }

  createSigHandler('SIGINT')
  createSigHandler('SIGTERM')
  // for nodemon
  createSigHandler('SIGUSR2')
}
