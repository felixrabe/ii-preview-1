import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import Redux from 'redux'

import actions from './actions/actions'
import App from './components/App'
import mainReducer from './reducers/main'

import './index.css'

const store = Redux.createStore(mainReducer)
window.store = store
window.actions = actions

window.thenlog = (x) => (x.then(y => console.log(y)), undefined)
window.thenlet = (n, x) => (x.then(y => window[n] = y), undefined)

export function _run() {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root'),
  )
}
