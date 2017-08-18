import D from 'draft-js'
import {combineReducers} from 'redux'

import actions from '../actions/actions'
import data from './data'
import editors from './editors'
import modifiedEditor from './modifiedEditor'
import path from './path'
import getCurrentText from '../selectors/getCurrentText'
import getData from '../selectors/getData'
import getModifiedEditor from '../selectors/getModifiedEditor'
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
  [actions.SAVE]: (state, action) => {
    const pathStr = state.modifiedEditor
    if (!pathStr) {
      return state
    }
    const editor = state.editors[pathStr]
    if (!editor) {
      return state
    }
    const editorState = editor.editorState
    if (!editorState) {
      return state
    }
    const text = editorState.getCurrentContent().getPlainText()
    const path = JSON.parse(pathStr)
    const oldData = getData({...state, path})
    let newData = text
    if (typeof oldData !== 'string') {
      try {
        newData = JSON.parse(text)
      } catch (err) {
        return state  // ignore
      }
    }
    const editors = {}
    if (pathStr === '[]') {  // root
      return {...state, data: newData, editors, modifiedEditor: null}
    }
    const p = path[path.length - 1]
    const data = path.slice(0, path.length - 1).reduce(
      (data, p) => (data[p] = {...data[p]}),
      {...state.data},
    )
    data[p] = newData
    return {...state, data, editors, modifiedEditor: null}
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
