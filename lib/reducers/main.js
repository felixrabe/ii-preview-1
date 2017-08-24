import _ from 'lodash'

import actions from '../actions/index'

import world from './world'

const defaultState = {
  activeWorld: 'default',
  worlds: {default: {}},
}

const localStorageKey = 'ii-0-main'

const hasWorld = (state, n) => Object.hasOwnProperty.call(state.worlds, n)

const main = (state = defaultState, action) => {
  action = {_save: true, ...action}
  // console.log('main>', action, state)

  switch (action.type) {

  case actions.CHANGE_WORLD:
    if (hasWorld(state, action.name)) {
      state = {...state, activeWorld: action.name}
    } else {
      action = {...action, _save: false}
    }
    break

  case actions.CREATE_WORLD:
    if (!hasWorld(state, action.name)) {
      const aWorld = world({name: action.name}, action)
      state = {...state, worlds: {...state.worlds, [action.name]: aWorld}}
    } else {
      action = {...action, _save: false}
    }
    break

  case actions.DELETE_WORLD:
    if (action.name !== state.activeWorld && hasWorld(state, action.name)) {
      world(state.worlds[action.name], action)
      state = {...state, worlds: _.omit(state.worlds, action.name)}
    } else {
      action = {...action, _save: false}
    }
    break

  case actions.LOAD:
    const storageState = JSON.parse(localStorage.getItem(localStorageKey))
    if (storageState) {
      storageState.worlds = _.fromPairs(storageState.worlds.map(name => (
        [name, world({name}, action)]
      )))
    }
    state = {...state, ...storageState}
    action = {...action, _save: false}
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
