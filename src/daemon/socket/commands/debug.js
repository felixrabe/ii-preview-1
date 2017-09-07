const command = {
  command: 'debug',
  desc: 'foo that',
  builder: () => {},

  handler: (argv) => argv.awaitPs.push((async () => {
    console.log(argv)
  })()),
}

export const __useDefault = command
export default __useDefault
