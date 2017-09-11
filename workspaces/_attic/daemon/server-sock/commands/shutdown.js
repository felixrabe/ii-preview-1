module.exports = {
  command: 'shutdown',
  desc: '',
  builder: () => {},

  handler: (argv) => argv.awaitPs.push((async () => {
    console.log('shutting down')
    process.kill(process.pid, 'SIGINT')
  })()),
}
