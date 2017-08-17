import React from 'react'
import ReactDOM from 'react-dom'
import { Provider, connect } from 'react-redux'
import Redux from 'redux'

import D from 'draft-js'

import actions from './actions/index'

const defaultState = {
  editorState: D.EditorState.createEmpty(),
}

const reducer = (state = defaultState, action) => {
  switch (action.type) {
  case actions.UPDATE_EDITOR_STATE:
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
const mapDispatchToProps = d => ({onChange: e => d(actions.updateEditorState(e))})

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
