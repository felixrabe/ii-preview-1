import fs from 'fs'
import mkdirp from 'mkdirp'
import multipipe from 'multipipe'
import net from 'net'
import os from 'os'
import path from 'path'

import DebugTransform from '../stream/DebugTransform'

const log = (...args) => console.log(...args)

const getSockPath = () => {
  const configPath = path.join(os.homedir(), '.config', 'ii-1')
  mkdirp.sync(configPath)
  const sockPath = path.join(configPath, 'cli-sock')
  // // TODO: remove on shutdown, maybe use PID file and kill prev process first
  // if (fs.existsSync(sockPath)) fs.unlinkSync(sockPath)
  return sockPath
}

const makeStream = () => multipipe(
  new DebugTransform(),
)

// eslint-disable-next-line no-unused-vars
const errHandler = (socket) => (err) => {
  // console.error(err)
  socket.end()
}

const server = net.createServer({allowHalfOpen: true})

server.on('connection', (socket) => {
  socket.pipe(makeStream()).on('error', errHandler(socket)).pipe(socket)
})

const sockPath = getSockPath()
server.listen(sockPath, () => {
  log(`Serving CLI via "${sockPath}"`)
})

if (process.listeners('SIGINT').length > 0) {
  // (Who registered this SIGINT handler?)
  process.listeners('SIGINT').forEach(l => process.removeListener('SIGINT', l))
}

const shutdown = async () => {
  log('Shutting down')
  return new Promise(res => server.close(res))
}

process.on('SIGINT', () =>
  shutdown().then(() => process.exit())
)

// for nodemon
process.once('SIGUSR2', () =>
  shutdown().then(() => process.kill(process.pid, 'SIGUSR2'))
)
