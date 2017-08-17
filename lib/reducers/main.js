import D from 'draft-js'

import actions from '../actions/index'

const defaultState = {
  inputState: D.EditorState.createEmpty(),
  transformState: D.EditorState.createEmpty(),
}

const main = (state = defaultState, action) => {
  switch (action.type) {
  case actions.SET_INPUT_STATE:
    return Object.assign({}, state, {inputState: action.inputState})
  case actions.SET_TRANSFORM_STATE:
    return Object.assign({}, state, {transformState: action.transformState})
  default:
    return state
  }
}

export default main
