import _ from 'lodash'

import actions from '../actions/index'

const defaultState = {
  name: undefined,
}

const localStoragePrefix = 'ii-0-world-'

const world = (state = defaultState, action) => {
  const localStorageKey = state.name && (localStoragePrefix + state.name)
  action = {_save: true, ...action}
  // console.log('world>', action, state)

  switch (action.type) {

  case actions.LOAD:
    if (localStorageKey) {
      const storageState = JSON.parse(localStorage.getItem(localStorageKey))
      state = {...state, ...storageState}
    }
    break

  case actions.REDUCE_WORLD:
    state = action.reducer(state)
    break

  default:
    action = {...action, _save: false}
  }

  // console.log('world<', action, state)
  if (action._save && localStorageKey) {
    const storageState = _.omit(state, 'name')
    localStorage.setItem(localStorageKey, JSON.stringify(storageState))
  }
  return state
}

export default world
