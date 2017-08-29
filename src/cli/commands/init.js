import init from '../core/init'
import log from '../utils/log'

const command = {
  command: ['init [dir]'],
  describe: 'Initialize project',
  builder: (yargs) => (
    yargs
  ),
  handler: async (argv) => {
    try {
      log('Initializing...')
      await init(argv.dir)
      log('Done.')
    } catch (err) {
      log.error(err)
    }
  },
}

export const __useDefault = command
export default __useDefault
