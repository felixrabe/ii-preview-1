import React from 'react'
import ReactDOM from 'react-dom'
import { Provider, connect } from 'react-redux'
import Redux from 'redux'

const reducer = (state = '', action) => {
  switch (action.type) {
  case 'set':
    return action.text
  default:
    return state
  }
}

const store = Redux.createStore(reducer)
window.store = store

const App_ = ({text, onChange}) => (
  <div>
    <input value={text} onChange={onChange} />
    {' => ' + text}
  </div>
)

const App = connect(
  state => ({
    text: state,
  }),
  dispatch => ({
    onChange: e => dispatch({type: 'set', text: e.target.value}),
  }),
)(App_)


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
