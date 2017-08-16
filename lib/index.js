import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import Redux from 'redux'

import App from './core2/App'
import mainReducer from './core2/MainReducer'

const store = Redux.createStore(mainReducer)
window.store = store

export function _run() {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root'),
  )
}
