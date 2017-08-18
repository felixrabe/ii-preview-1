import actions from '../actions/actions'

const defaultState = ['lib', 'actions']

const path = (state = defaultState, action) => {
  switch (action.type) {
  case actions.SET_DATA:
    return []
  case actions.SET_PATH:
    return action.path
  default:
    return state
  }
}

export default path
