import actions from '../actions/index'
import getCurrentWorld from '../selectors/getCurrentWorld'

import world from './world'

const defaultState = {
  currentWorld: 'default',
  worlds: {default: world(undefined, {})},
}

const main = (state = defaultState, action) => {
  // console.log('>', action, state)
  switch (action.type) {
  case actions.CHANGE_WORLD:
    var currentWorld = action.worldName
    state = {...state, currentWorld}
    var curWorld = world(state.worlds[currentWorld], {})
    curWorld = {...curWorld, name: currentWorld}
    var worlds = {...state.worlds, [currentWorld]: curWorld}
    state = main({...state, worlds}, actions.setDefaults())
    break
  default:
    var curWorld = world(getCurrentWorld(state), action)
    var worlds = {...state.worlds, [state.currentWorld]: curWorld}
    state = {...state, worlds}
  }
  // console.log('<', action, state)
  return state
}

export default main
