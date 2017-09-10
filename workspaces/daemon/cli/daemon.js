#!/usr/bin/env node

const log = require('ii-1-daemon-log')
const createServer = require('ii-1-daemon-server')

const main = () => {
  const server = createServer()

  server.listen()

  if (process.listeners('SIGINT').length > 0) {
    log('Removing previously registered SIGINT handlers')
    // (Who registered this SIGINT handler?)
    process.listeners('SIGINT')
      .forEach(l => process.removeListener('SIGINT', l))
  }

  const shutdown = () => new Promise(r => server.close(r))

  process.on('SIGINT', () =>
    shutdown().then(() => process.exit())
  )

  process.on('SIGTERM', () =>
    shutdown().then(() => process.exit())
  )

  // for nodemon
  process.once('SIGUSR2', () =>
    shutdown().then(() => process.kill(process.pid, 'SIGUSR2'))
  )
}

main()
