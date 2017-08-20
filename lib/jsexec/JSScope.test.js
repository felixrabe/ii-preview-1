import JSScope from './JSScope'

test('valuesForKeys', () => {
  const world = {items: {foo: 1, bar: 2}}
  const scope = new JSScope(world)
  expect(scope.valuesForKeys(['bar', 'foo'])).toEqual([2, 1])
})
