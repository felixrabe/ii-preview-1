exports.command = 'shutdown'
exports.desc = ''
exports.builder = () => {}

exports.handler = (argv) => argv.awaitPs.push((async () => {
  console.log('shutting down')
  process.kill(process.pid, 'SIGINT')
})())
