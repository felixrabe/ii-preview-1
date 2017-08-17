import D from 'draft-js'

import actions from '../actions/index'

const defaultState = {
  inputState: D.EditorState.createEmpty(),
}

const main = (state = defaultState, action) => {
  console.log('main', action.type)
  switch (action.type) {
  case actions.SET_INPUT_STATE:
    console.log('set input state:', action.inputState.getCurrentContent().getPlainText())
    return Object.assign({}, state, {inputState: action.inputState})
  default:
    return state
  }
}

export default main
