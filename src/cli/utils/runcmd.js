import childProcess from '@node/child_process'

import log from './log'

// abc => abc
// 'abc' => "'abc'"
// "abc" => "\"abc\""
// abc def => "abc def"
const pretendEscape = (s) => {
  if (!/[\\$"' ]/.test(s)) return s
  return '"' + (
    s
      .replace(/\\/g, '\\\\')
      .replace(/\$/g, '\\$')
      .replace(/"/g, '\\"')
  ) + '"'
}

const runcmd = async (cmd) => {
  if (Array.isArray(cmd)) {
    log('$ ' + cmd.map(pretendEscape).join(' '))
    return childProcess.spawnSync(cmd[0], cmd.slice(1), {
      encoding: 'utf-8',
      stdio: 'inherit',
    })
  } else {
    log('$ ' + cmd)
    return childProcess.spawnSync(cmd, {
      encoding: 'utf-8',
      shell: true,
      stdio: 'inherit',
    })
  }
}

export const __useDefault = runcmd
export default __useDefault
