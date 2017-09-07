import fs from 'fs'
import multipipe from 'multipipe'

import config from './config'
import createHttpServer from './createHttpServer'
import createSockServer from './socket/server'
import ExecCLITransform from './ExecCLITransform'
import InLinesTransform from './stream/InLinesTransform'
import JSONToObjTransform from './stream/JSONToObjTransform'

const makeStream = () => multipipe(
  new InLinesTransform(),
  new JSONToObjTransform(),
  new ExecCLITransform(),
)

const sockServer = createSockServer(makeStream)
const httpServer = createHttpServer()

Promise.all([
  new Promise(r => sockServer.once('listening', r)),
  new Promise(r => httpServer.once('listening', r)),
]).then(() => {
  fs.writeFileSync(config.paths.pid, '' + process.pid)
})

if (process.listeners('SIGINT').length > 0) {
  // (Who registered this SIGINT handler?)
  process.listeners('SIGINT').forEach(l => process.removeListener('SIGINT', l))
}

const shutdown = async () => {
  await sockServer.shutdown()
  await new Promise(r => httpServer.close(r))
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
