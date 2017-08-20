import JSRunner from './JSRunner'
import JSScope from './JSScope'

test('', async () => {
  const world = {items: {foo: 1, bar: 2}}
  const scope = new JSScope(world)
  const runner = new JSRunner(scope)
  expect(await runner.run('return foo')).toBe(1)
})
