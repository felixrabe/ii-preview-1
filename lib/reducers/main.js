import D from 'draft-js'
import {combineReducers} from 'redux'

import actions from '../actions/actions'
import data from './data'
import path from './path'

const main_ = combineReducers({path, data})

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
  }
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
