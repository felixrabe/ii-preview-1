const path = require('path')

const moduleLocator = require('.')
const loc = moduleLocator(module)

const testWithUrl = (testDesc, url, expected) =>
  test(testDesc, () => { expect(loc({url})).toEqual(expected) })

const testRedirect = (modName, where) =>
  testWithUrl(`redirects ${modName}`, `/${modName}`, {redirect: where})

const testLocate = (modName, urlPath, relFilePath, modType) =>
  testWithUrl(`locates ${modName} module file`, urlPath, {
    filePath: path.resolve(__dirname, '../../node_modules', relFilePath),
    modName,
    modType,
  })

const testModule = (modName, urlPath, relFilePath, modType) => {
  testRedirect(modName, urlPath)
  testLocate(modName, urlPath, relFilePath, modType)
}

testModule('jest', '/jest/build/jest.js?n=jest&t=cjs',
  'jest/build/jest.js', 'cjs')

testModule('parseurl', '/parseurl/index.js?n=parseurl&t=cjs',
  'parseurl/index.js', 'cjs')

testModule('react', '/react/umd/react.development.js?n=react&t=amd',
  'react/umd/react.development.js', 'amd')

testModule('react-redux', '/react-redux/es/index.js?n=react-redux&t=es',
  'react-redux/es/index.js', 'es')
