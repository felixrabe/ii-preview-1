import App from './App'
import React from 'react'

test('App should be class', () => {
  expect(new App()).toBeDefined()
})

test('App should be React.Container', () => {
  expect(<App />).toBeDefined()
})
