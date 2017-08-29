import runcmd from '../utils/runcmd'

const commit = async (dir, msg) => {
  await runcmd('git add -A')
  await runcmd(['git', 'commit', '-m', '[II] ' + msg])
}

export const __useDefault = commit
export default __useDefault
