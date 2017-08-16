import * as Path from './Path'

test('join', () => {
  expect(Path.join()).toBe('/')
  expect(Path.join(['/', '/a', 'b'], 'c')).toBe('/a/b/c')
  expect(Path.join(['a', '//b'], 'c')).toBe('/a/b/c')
})

test('joinBare', () => {
  expect(Path.joinBare()).toBe('')
  expect(Path.joinBare(['/', '/a', 'b'], 'c')).toBe('a/b/c')
  expect(Path.joinBare(['a', '//b'], 'c')).toBe('a/b/c')
})

test('split', () => {
  expect(Path.split('')).toEqual([])
  expect(Path.split('/')).toEqual([])
  expect(Path.split('/a/b/c')).toEqual(['a', 'b', 'c'])
  expect(Path.split('a/b//c')).toEqual(['a', 'b', 'c'])
})
