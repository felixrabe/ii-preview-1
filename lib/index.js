import React from 'react'
import ReactDOM from 'react-dom'
import { Provider, connect } from 'react-redux'
import Redux from 'redux'

import D from 'draft-js'

const defaultState = {
  editorState: D.EditorState.createEmpty(),
}

const reducer = (state = defaultState, action) => {
  switch (action.type) {
  case 'update':
    return {...state, editorState: action.editorState}
  default:
    return state
  }
}

const store = Redux.createStore(reducer)
window.store = store

const Editor = ({editorState, onChange}) => (
  <D.Editor
    editorState={editorState}
    onChange={onChange}
  />
)

const mapStateToProps = ({editorState}) => ({editorState})
const mapDispatchToProps = d => ({onChange: e => d({type: 'update', editorState: e})})

const ConnectedEditor = connect(mapStateToProps, mapDispatchToProps)(Editor)

const App = ConnectedEditor


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
