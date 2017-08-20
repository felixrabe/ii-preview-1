import actions from '../actions/index'

import Interpreter from './Interpreter'

let mockDispatch
let interpreter

beforeEach(() => {
  mockDispatch = jest.fn()
  interpreter = new Interpreter(undefined, mockDispatch)
})

test('senseless stuff', () => {
  interpreter.interpret('senseless stuff')
  expect(mockDispatch.mock.calls.length).toBe(0)
})

test('Text one two three', () => {
  interpreter.interpret('Text one two three')
  expect(mockDispatch.mock.calls.length).toBe(1)
  expect(mockDispatch.mock.calls[0][0])
    .toEqual(actions.updateItems({
      one: {type: 'Text'},
      two: {type: 'Text'},
      three: {type: 'Text'},
    }))
})

test(',rm one two three', () => {
  interpreter.interpret(',rm one two three')
  expect(mockDispatch.mock.calls.length).toBe(1)
  expect(mockDispatch.mock.calls[0][0])
    .toEqual(actions.removeItems(['one', 'two', 'three']))
})

test(',rename foo bar', () => {
  interpreter.interpret(',rename foo bar')
  expect(mockDispatch.mock.calls.length).toBe(1)
  expect(mockDispatch.mock.calls[0][0])
    .toEqual(actions.renameItem('foo', 'bar'))
})

test('code ,exec result', () => {
  interpreter.interpret('code ,exec result')
  expect(mockDispatch.mock.calls.length).toBe(1)
  expect(mockDispatch.mock.calls[0][0])
    .toEqual(actions.execute('code', 'result'))
})
