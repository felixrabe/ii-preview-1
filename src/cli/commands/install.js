import install from '../core/install'
import log from '../utils/log'

const command = {
  command: ['install <package>'],
  describe: 'Install package',
  builder: (yargs) => (
    yargs
  ),
  handler: async (argv) => {
    try {
      log(`Installing ${argv.package}...`)
      await install(argv.dir, argv.package)
      log('Done.')
    } catch (err) {
      log.error(err)
    }
  },
}

export const __useDefault = command
export default __useDefault
