import _ from 'lodash'

import actions from '../actions/index'

import world from './world'

const defaultState = {
  activeWorld: undefined,
  worlds: {},
}

const localStorageKey = 'ii-0-main'

const main = (state = defaultState, action) => {
  action = {_save: true, ...action}
  // console.log('main>', action, state)

  switch (action.type) {

  case actions.CHANGE_WORLD:
    state = {...state, activeWorld: action.name}
    break

  case actions.CREATE_WORLD:
    const aWorld = world({name: action.name}, action)
    state = {...state, worlds: {...state.worlds, [action.name]: aWorld}}
    break

  case actions.LOAD:
    const storageState = JSON.parse(localStorage.getItem(localStorageKey))
    if (storageState.worlds) {
      storageState.worlds = _.fromPairs(storageState.worlds.map(name => (
        [name, world({name}, action)]
      )))
    }
    state = {...state, ...storageState}
    break

  default:
    let thisWorld
    if (thisWorld = state.worlds[state.activeWorld]) {
      thisWorld = {...thisWorld, name: state.activeWorld}
      const worlds = {
        ...state.worlds,
        [state.activeWorld]: world(thisWorld, action),
      }
      state = {...state, worlds}
    }
    action = {...action, _save: false}
  }

  // console.log('main<', action, state)
  if (action._save) {
    const storageState = {
      activeWorld: state.activeWorld,
      worlds: Object.keys(state.worlds),
    }
    localStorage.setItem(localStorageKey, JSON.stringify(storageState))
  }
  return state
}

export default main
