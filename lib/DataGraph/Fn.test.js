import Fn from './Fn'

test('new Fn', () => {
  expect(new Fn()).toBeDefined()
})

test('run', () => {
  const fn = new Fn({
    args: ['s'],
    body: 's.toUpperCase()',
  })
  expect(fn.run('hello')).toBe('HELLO')
})
