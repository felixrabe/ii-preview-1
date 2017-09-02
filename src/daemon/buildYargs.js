import yargs from 'yargs'

const buildYargs = () => yargs()
  .commandDir('commands')
  .help()

export default buildYargs
