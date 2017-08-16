import SourceJS from './SourceJS'
import Store from './Store'

let store = undefined

beforeEach(() => {
  store = new Store(new SourceJS({
    foo: new SourceJS({
      bar: 1,
      baz: {
        x: 2,
        y: 3,
      },
    }),
  }))
})

test('new Store', () => {
  expect(store).toBeDefined()
})

test('get', async () => {
  expect(await store.get('foo/baz/x')).toBe(2)
})

test('dir', async () => {
  expect(await store.dir('foo/baz')).toEqual(['x', 'y'])
})

test('delete', async () => {
  await store.delete('foo/baz')
  expect(await store.dir('foo')).toEqual(['bar'])
})

test('set', async () => {
  expect(await store.get('foo/baz/x')).toBe(2)
  await store.set('foo/baz/x', 4)
  expect(await store.get('foo/baz/x')).toBe(4)
})

test('subscribe', async () => {
  let fooCounter = 0
  let barCounter = 0
  store.subscribe('foo', () => { fooCounter++ })
  store.subscribe('foo/bar', () => { barCounter++ })
  expect([fooCounter, barCounter]).toEqual([0, 0])
  await store.set('foo/q', 123)
  expect([fooCounter, barCounter]).toEqual([1, 0])
  await store.get('foo/q')
  expect([fooCounter, barCounter]).toEqual([1, 0])
  await store.delete('foo/q')
  expect([fooCounter, barCounter]).toEqual([2, 0])
  await store.get('foo/bar')
  expect([fooCounter, barCounter]).toEqual([2, 0])
  await store.set('foo/bar', 'new foo/bar')
  expect([fooCounter, barCounter]).toEqual([3, 1])
  await store.delete('foo/bar')
  expect([fooCounter, barCounter]).toEqual([4, 2])
  await store.set('foo/bar', 'another foo/bar')
  expect([fooCounter, barCounter]).toEqual([5, 3])
  await store.get('foo/bar')
  expect([fooCounter, barCounter]).toEqual([5, 3])
  await store.set('xx', 'yy')
  expect([fooCounter, barCounter]).toEqual([5, 3])
})
