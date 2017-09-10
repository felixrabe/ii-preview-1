module.exports = {
  command: 'debug',
  desc: 'foo that',
  builder: () => {},

  handler: (argv) => argv.awaitPs.push((async () => {
    console.log(argv)
  })()),
}
