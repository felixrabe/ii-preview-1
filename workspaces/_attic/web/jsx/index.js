let babel

if (typeof loadNodeModule !== 'undefined') {
  await loadNodeModule('babel-standalone')
}

babel = require('babel-standalone')

module.exports = (input) => babel.transform(input, {
  plugins: ["transform-react-jsx"],
}).code

const transform = (prevTransform) => ({code, ...evalArgs}) => {
  code = module.exports(code)
  return prevTransform({code, ...evalArgs})
}

module.exports.register = () => {
  const prevLoadRel = self._loadRel

  self._loadRel = (args) => {
    if (args.path.endsWith('.jsx')) {
      args = {...args, transform: transform(args.transform)}
    }
    return prevLoadRel(args)
  }
}

// const loadedCSS = {}

// const transform = ({__moduleName, code, ...evalArgs}) => {
//   if (__moduleName in loadedCSS) {
//     document.head.removeChild(loadedCSS[__moduleName])
//   }
//   const style = loadedCSS[__moduleName] = document.createElement('style')
//   style.appendChild(document.createTextNode(code))
//   document.head.appendChild(style)
// }

// const oldLoadRel = self._loadRel

// self._loadRel = (args) => {
//   if (args.path.endsWith('.css')) {
//     args = {...args, transform}
//   }
//   return oldLoadRel(args)
// }
