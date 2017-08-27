import yargs from '@node/yargs'

import server from './cli-server'

yargs
  .command(server)

yargs
  .demandCommand()
  .help().alias('help', 'h')
  .version()
  .argv
