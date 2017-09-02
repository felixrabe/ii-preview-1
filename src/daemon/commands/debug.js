exports.command = 'debug'
exports.desc = 'foo that'
exports.builder = () => {}

exports.handler = (argv) => argv.awaitPs.push((async () => {
  console.log(argv)
})())
