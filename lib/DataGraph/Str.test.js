import Str from './Str'

/* eslint-disable max-len */

// ''
const hashEmpty = 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'

/* eslint-enable max-len */

test('new Str', () => {
  expect(new Str()).toBeDefined()
})

test('hash', () => {
  expect(new Str('').hash()).toBe(hashEmpty)
})
