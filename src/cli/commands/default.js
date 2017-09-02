import fs from '@node/fs'
import mkdirp from '@node/mkdirp'
import pipe from '@node/multipipe'
import net from '@node/net'
import os from '@node/os'
import path from '@node/path'

import AppTransform from '../../stream/AppTransform'
// import DebugTransform from '../../stream/DebugTransform'
import InLinesTransform from '../../stream/InLinesTransform'
// import JSONToObjTransform from '../../stream/JSONToObjTransform'
import ObjToJSONTransform from '../../stream/ObjToJSONTransform'
import ToStringTransform from '../../stream/ToStringTransform'
import TrimTransform from '../../stream/TrimTransform'
import log from '../utils/log'

// eslint-disable-next-line no-unused-vars
const errHandler = (socket) => (err) => {
  // console.error(err)
  socket.end()
}

const makeStream = () => pipe(
  new InLinesTransform(),
  new ToStringTransform(),
  new TrimTransform(),
  // new JSONToObjTransform(),
  new AppTransform(),
  new ObjToJSONTransform(),
)

const command = {
  command: ['*'],
  describe: 'CLI server',
  builder: (yargs) => (
    yargs
      .option({
        force: {
          alias: 'f',
          type: 'boolean',
        },
      })
  ),
  handler: async (argv) => {
    const configPath = path.join(os.homedir(), '.config', 'ii-1')
    mkdirp.sync(configPath)
    const sockPath = path.join(configPath, 'cli-sock')
    if (argv.force && fs.existsSync(sockPath)) fs.unlinkSync(sockPath)

    const server = net.createServer({allowHalfOpen: true})
      .on('connection', (socket) => {
        socket
          .pipe(makeStream())
          .on('error', errHandler(socket))
          .pipe(socket)
      })
      .listen(sockPath, () => {
        log(`Serving CLI via "${sockPath}"`)
      })

    // (Who registered this SIGINT handler?)
    process.removeListener('SIGINT', process.listeners('SIGINT')[0])

    process.on('SIGINT', () => {
      // Ensure sockPath is removed (handled by net.Server on 'close'
      // apparently)
      server.close(() => process.exit())
    })
  },
}

export const __useDefault = command
export default __useDefault
