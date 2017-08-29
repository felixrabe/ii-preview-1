const yargsPortCheck = (argv) => {
  const {port} = argv
  if (typeof port !== 'number' || Number.isNaN(port)) {
    throw new TypeError('Specified port is not a number')
  }
  return true
}

export const __useDefault = yargsPortCheck
export default __useDefault
