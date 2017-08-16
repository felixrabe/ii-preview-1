import localStorage from 'localStorage'

import SourceStorage from './SourceStorage'

test('get and set', async () => {
  const source = new SourceStorage(localStorage, 'test')
  expect(await source.get('hello')).toBeUndefined()
  expect(localStorage.getItem('test-hello')).toBeNull()
  await source.set(['hello'], ['world'])
  expect(await source.get('hello')).toBe('world')
  expect(localStorage.getItem('test/hello')).toBe('"world"')
})

test('delete', async () => {
  const source = new SourceStorage(localStorage, 'test')
  await source.set(['hello'], ['world'])
  await source.delete(['hello'])
  expect(await source.get(['hello'])).toBeUndefined()
  expect(localStorage.getItem('test-hello')).toBeNull()
})

test('dir', async () => {
  const source = new SourceStorage(localStorage, 'test')
  await source.set(['hello'], ['world'])
  expect(await source.dir([])).toEqual(['hello'])
})
