const iiCmd = (...cmd) => JSON.stringify({ii: cmd}) + '\n'

module.exports = async (socket, fn) => {
  // console.log('wrapSocket.js:', 'Init.')
  socket.write(iiCmd('hello', '0.1.0'))

  socket.on('close', () => {
    // console.log('wrapSocket.js:', '[close]')
    socket.end()
  })

  socket.on('end', () => {
    // console.log('wrapSocket.js:', '[end]')
    socket.end()
  })

  try {
    await fn(socket)
  } catch (err) {
    console.error(err)
    if (!socket.destroyed)
      socket.write(iiCmd('error', {name: err.name, message: err.message}))
  }

  // console.log('wrapSocket.js:',
  //   `End (socket already destroyed? ${socket.destroyed}).`)
  // socket.destroyed || socket.end(iiCmd('end'))
  socket.destroyed || socket.end()
}
