import _ from 'lodash'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import Redux from 'redux'
import thunk from 'redux-thunk'

import actions from './actions/index'
import App from './components/App'
import mainReducer from './reducers/main'
import './utils/ReactPatch'

import './index.css'
import './system-font.css'

const store = Redux.createStore(mainReducer, Redux.applyMiddleware(thunk))
store.dispatch(actions.load())

window._ = _
window.dispatch = (n, ...args) => store.dispatch(actions[n](...args))
window.store = store
window.thenlet = (n, x) => (x.then(y => window[n] = y), undefined)
window.thenlog = (x) => (x.then(y => console.log(y)), undefined)

export function _run() {
  ReactDOM.render(
    <Provider key={_.uniqueId('rootkey-')} store={store}>
      <App />
    </Provider>,
    document.getElementById('root'),
  )
}
