import fs from 'fs'

import config from './config'
import createHttpServer from './http/server'
import createSockServer from './socket/server'

const main = () => {
  const sockServer = createSockServer()
  const httpServer = createHttpServer()

  Promise.all([
    new Promise(r => sockServer.once('listening', r)),
    new Promise(r => httpServer.once('listening', r)),
  ]).then(() => {
    fs.writeFileSync(config.paths.pid, '' + process.pid)
  })

  if (process.listeners('SIGINT').length > 0) {
    // (Who registered this SIGINT handler?)
    process.listeners('SIGINT')
      .forEach(l => process.removeListener('SIGINT', l))
  }

  const shutdown = async () => {
    await sockServer.shutdown()
    await httpServer.shutdown()
  }

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

export const __useDefault = main
export default __useDefault
