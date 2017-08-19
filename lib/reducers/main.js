import getCurrentWorld from '../selectors/getCurrentWorld'
import world from './world'

const defaultState = {
  currentWorld: 'default',
  worlds: {default: world(undefined, {})},
}

const main = (state = defaultState, action) => {
  switch (action.type) {
  default:
    var curWorld = world(getCurrentWorld(state), action)
    var worlds = {...state.worlds, [state.currentWorld]: curWorld}
    return {...state, worlds}
  }
}

export default main
