import JSScope from './JSScope'

test('valuesForKeys', () => {
  const vars = {foo: 1, bar: 2}
  const scope = new JSScope(vars)
  expect(scope.valuesForKeys(['bar', 'foo'])).toEqual([2, 1])
})
