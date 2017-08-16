import SourceJS from './SourceJS'

test('get', async () => {
  const source = new SourceJS({x: 5})
  expect(await source.get(['x'])).toBe(5)
})

test('dir', async () => {
  const source = new SourceJS({
    foo: {
      bar: 1,
      baz: {
        x: 2,
        y: 3,
      },
    },
  })
  expect(await source.get(['foo', 'ii_dir'])).toBeUndefined()
  expect(await source.dir(['foo'])).toEqual(['bar', 'baz'])
  expect(await source.dir(['foo', 'baz'])).toEqual(['x', 'y'])
  // expect(await source.dir([]).toEqual(['foo']))
})

test('nested', async () => {
  const source = new SourceJS({
    foo: new SourceJS({
      bar: 1,
      baz: {
        x: 2,
        y: 3,
      },
    }),
  })
  expect(await source.dir(['foo'])).toEqual(['bar', 'baz'])
  expect(await source.dir(['foo', 'baz'])).toEqual(['x', 'y'])
})

test('delete', async () => {
  const source = new SourceJS({
    foo: true,
    bar: true,
  })
  expect(await source.dir([])).toEqual(['bar', 'foo'])
  expect(await source.get(['foo'])).toBe(true)
  await source.delete(['foo'])
  expect(await source.dir([])).toEqual(['bar'])
  expect(await source.get(['foo'])).toBeUndefined()
})

test('set', async () => {
  const source = new SourceJS({})
  expect(await source.get(['foo'])).toBeUndefined()
  await source.set(['foo'], ['bar'])
  expect(await source.get(['foo'])).toBe('bar')
})

test('root', async () => {
  const source = new SourceJS({x: 1})
  expect(await source.get([])).toEqual({x: 1})
  expect(await source.dir([])).toEqual(['x'])
  await source.set([], [{y: 2}])
  expect(await source.get([])).toEqual({y: 2})
  expect(await source.dir([])).toEqual(['y'])
})
