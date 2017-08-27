import runCommandSync from './runCommandSync'

const commit = (dir, msg) => {
  runCommandSync('git add -A')
  runCommandSync(['git', 'commit', '-m', '[II] ' + msg])
}

export const __useDefault = commit
export default __useDefault
