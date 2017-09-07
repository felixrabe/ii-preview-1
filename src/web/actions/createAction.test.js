import actions from './actions'
import createAction from './createAction'

test('undefined actions throw', () => {
  expect(() => { actions.DO_STUFF }).toThrow()
})

test('actions do not throw after being defined', () => {
  expect(() => { actions.DO_STUFF }).toThrow()
  createAction('do stuff')
  expect(() => { actions.DO_STUFF }).not.toThrow()
})
