import path from '@node/path'
import yargs from '@node/yargs'

import init from './cli-init'
import server from './cli-server'
import {checkPackageJson, checkIIConfiguration} from './cliChecks'

yargs
  .command(init)
  .command(server)

yargs
  .env('II')
  .option('dir', {
    alias: 'd',
    default: '.',
    coerce: path.resolve,
    demandOption: true,
  })
  .check((argv) => {
    if (argv._[0] === 'init') return true
    const {dir, pkg} = checkPackageJson(argv.dir)
    checkIIConfiguration(pkg, dir)
    Object.assign(argv, {ii: pkg.ii, dir})
    process.chdir(dir)
    return true
  })
  .demandCommand()
  .strict()
  .help().alias('help', 'h')
  .version()
  .argv
