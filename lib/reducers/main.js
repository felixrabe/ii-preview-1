import actions from '../actions/index'

const defaultState = {
  activeWorld: undefined,
  worlds: {},
}

const localStorageKey = 'ii-0-main'

const main = (state = defaultState, action) => {
  action = {_save: true, ...action}
  // console.log('main>', action, state)
  switch (action.type) {
  case actions.ADD_WORLD:
    state = {...state, worlds: {...state.worlds, [action.name]: {}}}
    break
  case actions.LOAD:
    state = JSON.parse(localStorage.getItem(localStorageKey)) || defaultState
    break
  default:
    action = {...action, _save: false}
  }

  // console.log('main<', action, state)
  if (action._save) {
    localStorage.setItem(localStorageKey, JSON.stringify(state))
  }
  return state
}

export default main
