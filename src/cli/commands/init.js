import ProjectConfig from '../../ProjectConfig/index'
import commit from '../utils/commit'
import log from '../utils/log'
import runcmd from '../utils/runcmd'

const onMissingConfig = ({create}) => {
  create({log, runcmd})
}

const command = {
  command: ['init [dir]'],
  describe: 'Initialize project',
  builder: (yargs) => (
    yargs
  ),
  handler: async (argv) => {
    try {
      log('Initializing...')
      try {
        await commit(argv.dir, 'pre init')
      } catch (err) { /* ignore */ }
      const projectConfig = new ProjectConfig({dir: argv.dir, onMissingConfig})
      await commit(projectConfig.dir, 'init')
      log('Done.')
    } catch (err) {
      log.error(err)
    }
  },
}

export const __useDefault = command
export default __useDefault
