import path from '@node/path'
import yargs from '@node/yargs'

import cliCommands from './cli/commands'

cliCommands(yargs).then(yargs => {
  yargs
    .env('II')
    .option('dir', {
      alias: 'd',
      default: '.',
      coerce: path.resolve,
      demandOption: true,
    })
    .demandCommand()
    .strict()
    .help().alias('help', 'h')
    .version()
    .argv
})
