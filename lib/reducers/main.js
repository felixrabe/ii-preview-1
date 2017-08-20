import actions from '../actions/index'
import JSRunner from '../jsexec/JSRunner'
import JSScope from '../jsexec/JSScope'
import getCurrentWorld from '../selectors/getCurrentWorld'

import world from './world'

const defaultState = {
  currentWorld: 'default',
  promises: [],
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
  case actions.EXECUTE:
    var curWorld = world(getCurrentWorld(state), {})
    var {code, output} = action
    code = curWorld.items[code]
    var text = (code && code.toJSON && code.toJSON().text)
    if (!text) break
    var scope = new JSScope(curWorld)
    var runner = new JSRunner(scope)
    var promise = runner.run(text).then(result => {
      console.log('result', result)
      return actions.updateItems({[output]: {type: 'Text', text: JSON.stringify(result)}})
    })
    var promises = [...state.promises, promise]
    state = {...state, promises}
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
