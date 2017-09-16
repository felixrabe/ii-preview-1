const executeScript = require('./executeScript')
const readLine = require('./readLine')
const { cloneAssign } = require('./utils')
const wrapSocket = require('./wrapSocket')

const socketHandler = (scriptPath) => async (socket) => {
  const headerLine = await readLine(socket)
  const header = JSON.parse(headerLine)

  const {ii} = header
  const [cwd, ...args] = ii

  if (!cwd) {  // server command
    if (args.length === 1 && args[0] === '--shutdown') {
      process.kill(process.pid, 'SIGINT')
      return
    }
  }

  const options = {
    inStream: cloneAssign(socket, { end() {} }),
    outStream: socket,
    errStream: socket,
    cwd,
  }

  await executeScript(scriptPath, args, options)
}

module.exports = (scriptPath) => async (socket) => {
  const errHandler = (err) => {
    console.error(err)
    if (!socket.destroyed) socket.end()
  }

  socket.on('error', errHandler)
  try {
    await wrapSocket(socket, socketHandler(scriptPath))
  } catch (err) {
    errHandler(err)
  }
}
