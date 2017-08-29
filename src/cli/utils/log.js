import chalk from '@node/chalk'

const log = (...args) => {
  console.log(chalk.blue(...args))
}

log.error = (...args) => {
  // console.error(chalk.red(...args))
  console.error(...args)
}

export const __useDefault = log
export default __useDefault
