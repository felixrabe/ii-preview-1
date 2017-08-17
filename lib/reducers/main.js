import D from 'draft-js'
import {combineReducers} from 'redux'

import actions from '../actions/actions'
import data from './data'
import editors from './editors'
import modifiedEditor from './modifiedEditor'
import path from './path'
import getOriginalText from '../selectors/getOriginalText'
import getPathStr from '../selectors/getPathStr'

const main_ = combineReducers({path, data, editors, modifiedEditor})

const actionHandlers = {
  [actions.DELETE_KEY]: (state, action) => {
    const {key} = action
    const data = {...state.data}
    delete state.path.reduce(
      (data, p) => (data[p] = {...data[p]}),
      data,
    )[key]
    return {...state, data}
  },
  [actions.SET_KEY_VALUE]: (state, action) => {
    const {key, value} = action
    const data = {...state.data}
    state.path.reduce(
      (data, p) => (data[p] = {...data[p]}),
      data,
    )[key] = value
    return {...state, data}
  },
  [actions.UPDATE_EDITOR]: (state, action) => {
    const {path} = action
    const pathStr = getPathStr(state)
    let {editorState} = action
    let {modifiedEditor} = state
    const editors = {...state.editors}
    let editor = editors[pathStr]
    if (!editor) {
      editor = {originalText: getOriginalText(state)}
    }
    const originalText = editor.originalText
    if (editorState.getCurrentContent().getPlainText() === originalText) {
      if (modifiedEditor === pathStr) {
        modifiedEditor = null
      } else {
        // all ok
      }
    } else {
      if (modifiedEditor === null) {
        modifiedEditor = pathStr
      } else if (modifiedEditor === pathStr) {
        // all ok
      } else {
        // do not allow modification (set readOnly too!)
        editorState = editor.editorState
      }
    }
    editors[pathStr] = {...editor, editorState: editorState}
    return {...state, modifiedEditor, editors}
  },
}

const main = (state, action) => {
  const actionHandler = actionHandlers[action.type]
  if (actionHandler) {
    return actionHandler(state, action)
  } else {
    return main_(state, action)
  }
}

export default main
