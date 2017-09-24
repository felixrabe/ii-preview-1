const path = require('path')

const moduleLocator = require('.')
const parentMod = require('./example/_thisMod.js')
const loc = moduleLocator(parentMod)

const testWithUrl = (testDesc, url, expected) =>
  test(testDesc, () => { expect(loc({url})).toEqual(expected) })

const testRedirect = (modName, where) =>
  testWithUrl(`redirects ${modName}`, `/${modName}`, {redirect: where})

const testLocate = (modName, urlPath, relFilePath, modType) =>
  testWithUrl(`locates ${modName}`, urlPath, {
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

testWithUrl('redirects index', '/', {redirect: '/index.mjs?n=&t=es'})
testWithUrl('locates index', '/index.mjs?n=&t=es', {
  filePath: path.resolve(path.dirname(parentMod.filename), 'index.mjs'),
  modName: '',
  modType: 'es',
})

testWithUrl('redirects /foo.mjs', '/foo.mjs', {redirect: '/foo.mjs?n=&t=es'})
testWithUrl('locates /foo.mjs', '/foo.mjs?n=&t=es', {
  filePath: path.resolve(path.dirname(parentMod.filename), 'foo.mjs'),
  modName: '',
  modType: 'es',
})

testWithUrl('redirects /bar/baz.mjs', '/bar/baz.mjs',
  {redirect: '/bar/baz.mjs?n=&t=es'})
testWithUrl('locates /bar/baz.mjs', '/bar/baz.mjs?n=&t=es', {
  filePath: path.resolve(path.dirname(parentMod.filename), 'bar/baz.mjs'),
  modName: '',
  modType: 'es',
})
