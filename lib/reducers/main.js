import D from 'draft-js'

import actions from '../actions/index'

const defaultState = {
  inputState: D.convertToRaw(D.ContentState.createFromText('')),
}

const main = (state = defaultState, action) => {
  switch (action.type) {

  case actions.SET_INPUT:
    return Object.assign({}, state, {
      inputState: action.inputState,
    })

  default:
    return state
  }
}

export default main
