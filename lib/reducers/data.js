import actions from '../actions/actions'

const defaultState = {
  'run.sh': 'bash...',
  lib: {
    'index.js': 'index...',
    actions: {
      'actions.js': '...',
      'actionsMap.js': '...',
    },
  },
}

const data = (state = defaultState, action) => {
  switch (action.type) {
  case actions.SET_DATA:
    return action.data
  default:
    return state
  }
}

export default data
