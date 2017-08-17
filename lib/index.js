import React from 'react'
import ReactDOM from 'react-dom'
import { Provider, connect } from 'react-redux'
import Redux from 'redux'

import actions from './actions/index'

const defaultState = {
  content: '',
}

const mainReducer = (state = defaultState, action) => {
  switch (action.type) {
  case actions.SET_INPUT:
    return Object.assign({}, state, {content: action.content})
  default:
    return state
  }
}

const Input_ = ({value, onChange}) => (
  <input value={value} onChange={onChange} />
)

const Input = connect(
  state => ({
    value: state.content,
  }),
  dispatch => ({
    onChange: e => dispatch(actions.setContent(e.target.value))
  }),
)(Input_)

const Output_ = ({value}) => (
  <div>{value.toUpperCase()}</div>
)

const Output = connect(
  state => ({
    value: state.content,
  }),
)(Output_)

const App = () => (
  <div>
    <Input />
    <Output />
  </div>
)

const store = Redux.createStore(mainReducer)
window.store = store

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
