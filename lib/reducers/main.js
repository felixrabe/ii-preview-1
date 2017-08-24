import _ from 'lodash'

import actions from '../actions/index'

const defaultState = {
  requests: {
    open: {},
    result: {},
  },
}

const localStorageKey = 'ii-0-main'

const main = (state = defaultState, action) => {
  action = {_save: true, ...action}
  console.log('>', action, state)

  switch (action.type) {
  case actions.FETCH_URL_OPEN:
    state = {...state, requests: {
      ...state.requests,
      open: {...state.requests.open, [action.url]: true},
    }}
    break
  case actions.FETCH_URL_RESULT:
    state = {...state, requests: {
      ...state.requests,
      open: _.omit(state.requests.open, action.url),
      result: {...state.requests.result, [action.url]: action.result},
    }}
    break
  default:
    action = {...action, _save: false}
  }

  console.log('<', action, state)
  return state
}

export default main
