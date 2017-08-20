import _ from 'lodash'

import actions from '../actions/index'
import getCurrentWorld from '../selectors/getCurrentWorld'
import objAssign from '../utils/objAssign'

const defaultsMap = {}

const getDefaultsFor = (items) => {
  const defaultsMapKeys = new Set(Object.keys(defaultsMap))
  return Promise.all(items.map(({type}) => {
    if (defaultsMapKeys.has(type)) {
      return defaultsMap[type]
    }
    const path = `lib/items/${type}Defaults`
    return SystemJS.import(path).then(m => (
      defaultsMap[type] = objAssign(m.default, {type})
    ))
  }))
}

let currentItems
let currentWorld
let store

const observer = async () => {
  const state = store.getState()
  const items = getCurrentWorld(state).items

  const previousWorld = currentWorld || 'default'
  const previousItems = currentItems || []
  currentWorld = state.currentWorld
  currentItems = Object.keys(items).sort()

  const newKeysSet = new Set(currentItems)
  if (previousWorld === currentWorld) {
    if (previousItems.join(' ') === currentItems.join(' ')) {
      return
    }
    previousItems.forEach(k => newKeysSet.delete(k))
  }
  const newKeys = [...newKeysSet]
  const newItems = newKeys.map(k => items[k])
  const newDefaults = await getDefaultsFor(newItems)
  store.dispatch(actions.setDefaultsForItems(
    _.fromPairs(_.zip(newKeys, newDefaults))
  ))
}

let unsubscribe

const observe = (store_) => {
  store = store_
  unsubscribe = store.subscribe(observer)
  return store
}

export default observe
