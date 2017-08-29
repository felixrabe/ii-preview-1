import ProjectConfig from '../../ProjectConfig'
import log from '../utils/log'
import runcmd from '../utils/runcmd'
import commit from './commit'

const onMissingConfig = ({create}) => {
  create({log, runcmd})
}

const init = async (dir) => {
  const projectConfig = new ProjectConfig({dir, onMissingConfig})
  await commit(projectConfig.dir, 'init')
}

export const __useDefault = init
export default __useDefault
