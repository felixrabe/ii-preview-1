const loadedCSS = Object.create(null)

const transform = ({__moduleName, code, ...evalArgs}) => {
  if (__moduleName in loadedCSS) {
    document.head.removeChild(loadedCSS[__moduleName])
  }
  const style = loadedCSS[__moduleName] = document.createElement('style')
  style.appendChild(document.createTextNode(code))
  document.head.appendChild(style)
}

const prevLoadRel = self._loadRel

self._loadRel = (args) => {
  if (args.path.endsWith('.css')) {
    args = {...args, transform}
  }
  return prevLoadRel(args)
}
