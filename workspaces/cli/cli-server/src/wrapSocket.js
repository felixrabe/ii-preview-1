const iiCmd = (...cmd) => JSON.stringify({ii: cmd}) + '\n'

module.exports = async (socket, fn) => {
  socket.write(iiCmd('hello', '0.1.0'))

  socket.on('close', () => {
    socket.end()
  })

  socket.on('end', () => {
    socket.end()
  })

  try {
    await fn(socket)
  } catch (err) {
    console.error(err)
    if (!socket.destroyed)
      socket.write(iiCmd('error', {name: err.name, message: err.message}))
  }

  socket.destroyed || socket.end()
}
