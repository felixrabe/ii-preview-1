const executeScript = require('./executeScript')

module.exports = (scriptPath) => async (socket) => {
  const init = JSON.stringify({ii: {'cli-server': '0.1.0', cmd: 'init'}})
  const end = JSON.stringify({ii: {'cli-server': '0.1.0', cmd: 'end'}})

  socket.on('close', () => {
    console.log('handleConnectionExec.js:', 'close event')
    socket.end()
    // socket.end(`${end}\n`)
  })

  socket.on('end', () => {
    console.log('handleConnectionExec.js:', 'end event')
    socket.end()
  })

  socket.write(`${init}\n`)
  await new Promise(r => setTimeout(r, 1000))

  const args = []  // TODO
  const cwd = ''  // TODO
  const options = {
    inStream: socket,
    outStream: socket,
    errStream: socket,
    cwd,
  }
  // console.log('handleConnectionExec.js:', 'Executing...')
  await executeScript(scriptPath, args, options)
  // console.log('handleConnectionExec.js:', 'Executed.')
  socket.destroyed || socket.end(`${end}\n`)
}
