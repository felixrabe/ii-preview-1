import JSRunner from './JSRunner'
import JSScope from './JSScope'

test('simple code', async () => {
  const vars = {foo: 1, bar: 2}
  const scope = new JSScope(vars)
  const runner = new JSRunner(scope)
  expect(await runner.run('return foo')).toBe(1)
})
