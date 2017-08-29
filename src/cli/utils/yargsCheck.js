import ProjectConfig from '../../ProjectConfig'

const onMissingConfig = ({message}) => {
  throw new Error(message)
}

const yargsCheck = (argv) => {
  if (argv._[0] === 'init') return true
  const projectConfig = new ProjectConfig({...argv, onMissingConfig})
  // TODO: other than dir, might want to do something like:
  // Object.assign(argv, projectConfig, argv)
  Object.assign(argv, projectConfig)
  process.chdir(argv.dir)
  return true
}

export const __useDefault = yargsCheck
export default __useDefault
